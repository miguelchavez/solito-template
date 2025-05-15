import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from '@utils/constants/storage'

const THEME_STORAGE_KEY = STORAGE_KEYS['THEME']
const BOTTOM_TAB_BAR_SIZE_STORAGE_KEY = STORAGE_KEYS['BOTTOM_TAB_BAR_SIZE']
const IS_AGREEMENT_ACCEPTED_STORAGE_KEY = STORAGE_KEYS['IS_AGREEMENT_ACCEPTED']

export const SettingsContext = createContext({
    settings: {
        theme: 'system', // 'light' | 'dark' | 'system'
        bottomTabBarSize: 'small', // 'small' | 'large'
        isAgreementAccepted: 'false', // defaults to false
    },
    updateSettings: (newSettings) => {},
})

export const SettingsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [settings, setSettings] = useState({
        theme: 'system', // 'light' | 'dark' | 'system'
        bottomTabBarSize: 'small', // 'small' | 'large'
        isAgreementAccepted: 'false', // defaults to false
    })

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
                const bottomTabBarSize = await AsyncStorage.getItem(
                    BOTTOM_TAB_BAR_SIZE_STORAGE_KEY,
                )
                const isAgreementAccepted = await AsyncStorage.getItem(
                    IS_AGREEMENT_ACCEPTED_STORAGE_KEY,
                )
                const data = {
                    theme: theme ?? 'system',
                    bottomTabBarSize: bottomTabBarSize ?? 'small',
                    isAgreementAccepted: isAgreementAccepted ?? 'false',
                }
                setSettings(data)
            } catch (e) {
                console.error('Error loading settings from AsyncStorage', e)
            } finally {
                setLoading(false)
            }
        }

        loadSettings()
    }, [])

    if (loading) {
        return null // not ready yet
    }

    const updateSettings = async (newSettings) => {
        const sanitizedSettings = {
            theme:
                typeof newSettings.theme === 'string'
                    ? newSettings.theme
                    : 'system',
            bottomTabBarSize:
                typeof newSettings.bottomTabBarSize === 'string'
                    ? newSettings.bottomTabBarSize
                    : 'small',
            isAgreementAccepted:
                typeof newSettings.isAgreementAccepted === 'string'
                    ? newSettings.isAgreementAccepted
                    : 'false',
        }
        try {
            await AsyncStorage.setItem(
                THEME_STORAGE_KEY,
                sanitizedSettings.theme,
            )
            await AsyncStorage.setItem(
                BOTTOM_TAB_BAR_SIZE_STORAGE_KEY,
                sanitizedSettings.bottomTabBarSize,
            )
            await AsyncStorage.setItem(
                IS_AGREEMENT_ACCEPTED_STORAGE_KEY,
                sanitizedSettings.isAgreementAccepted,
            )
        } catch (e) {
            console.error('Error saving settings to AsyncStorage', e)
        } finally {
            setSettings(sanitizedSettings) // Update the state with new settings
            // console.log('Settings updated:', sanitizedSettings)
        }
    }

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}
