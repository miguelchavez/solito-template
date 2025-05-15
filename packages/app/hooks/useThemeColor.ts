/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native' //'./useColorScheme'
import { Colors } from '@utils/constants/colors'
import useSettings from './useSettings'
import { useEffect, useState } from 'react'

/**
 * Take into account the color scheme of the user setting.
 * We need to get this setting from the storage (AsyncStorage)
 * If the userTheme is 'system', we will use the systemTheme, which could be 'light' or 'dark'
 * If the userTheme is 'light' or 'dark', it means that user preffers that theme over the system setting
 **/
export function useThemeColor(
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
    const systemTheme = useColorScheme() ?? 'light'
    const [isLoading, setIsLoading] = useState(true)
    const [color, setColor] = useState('')

    useEffect(() => {
        const getSettings = async () => {
            const userTheme = await useSettings('THEME')
            const theme =
                userTheme && userTheme === 'system' ? systemTheme : userTheme

            setIsLoading(false)
            setColor(Colors[theme][colorName])
        }
        getSettings()
    }, [])

    if (!isLoading && color) {
        return color
    }
}
