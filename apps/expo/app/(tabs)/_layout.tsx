import { Platform, useWindowDimensions, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { SymbolView } from 'expo-symbols'

// import TabBarBackground from '@components/TabBarBackground'
import { HapticTab } from '../../components/HapticTab'
import { useThemeColor } from '@hooks/useThemeColor'
import { useEffect, useState } from 'react'

import { useContext } from 'react'
import { SettingsContext } from 'app/providers/settingsContextProvider'

import { BlurView } from 'expo-blur'

const _layout = () => {
    const { height, width } = useWindowDimensions()
    const { settings, updateSettings } = useContext(SettingsContext)
    const activeColor = useThemeColor('primaryForeground')
    const inactiveColor = useThemeColor('inactiveIcon')
    const activeBackground = useThemeColor('primary')
    const [tabBarSettings, setTabBarSettings] = useState({
        position: 'left',
        variant: 'uikit',
        labelPosition: 'beside-icon',
    })

    const updateTabBar = () => {
        if (settings) {
            // update state from settings
            const isBigIcons = settings?.bottomTabBarSize === 'large'
            const isBigScreen = width > 900
            if (isBigScreen) {
                const variant = isBigIcons ? 'material' : 'uikit'
                const labelPos = isBigIcons ? 'below-icon' : 'beside-icon'
                const data = {
                    position: 'left',
                    variant: variant,
                    labelPosition: labelPos,
                }
                setTabBarSettings(() => data)
            } else {
                const variant = 'uikit' // isBigIcons ? 'material' : 'uikit'
                const labelPos = 'beside-icon' // isBigIcons ? 'below-icon' : 'beside-icon'
                const data = {
                    position: 'bottom',
                    variant: variant,
                    labelPosition: labelPos,
                }
                setTabBarSettings(() => data)
            }
        }
    }

    useEffect(() => {
        // console.log('Settings:', settings)
        updateTabBar()
    }, [settings, width])

    useEffect(() => {
        updateTabBar()
    }, [])

    return (
        <Tabs
            initialRouteName="dashboard"
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                tabBarActiveBackgroundColor:
                    width > 900 ? activeBackground : undefined,
                headerShown: false,
                tabBarButton: HapticTab,
                // tabBarBackground: TabBarBackground, // This is to personalize the tab bar background
                // tabBarBackground: () => (
                //     <BlurView
                //         tint="light"
                //         intensity={100}
                //         style={StyleSheet.absoluteFill}
                //     />
                // ),
                tabBarPosition: tabBarSettings?.position,
                tabBarLabelPosition: tabBarSettings?.labelPosition,
                tabBarVariant: tabBarSettings?.variant,

                tabBarHideOnKeyboard: true,
                tabBarItemStyle: {
                    height: 60,
                    padding: 2,
                },
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: width < 900 ? 'absolute' : undefined,
                    },
                    default: {},
                }),
            }}
        >
            {/* Home Screen */}
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    headerShown: false,
                    animation: 'shift', // https://reactnavigation.org/docs/bottom-tab-navigator?config=dynamic#animations
                    tabBarLabelStyle: { fontSize: 14 },
                    tabBarIcon: ({ focused, color, size }) => (
                        <SymbolView
                            size={32}
                            name="tray.full.fill" //"rectangle.3.offgrid.fill"
                            tintColor={color}
                            // tintColor={focused ? activeColor : inactiveColor}
                            //   style={{ backgroundColor: "#00000010", borderRadius: 50 }}
                        />
                    ),
                }}
            />

            {/* Documents Screen */}
            <Tabs.Screen
                name="documents/index"
                options={{
                    title: 'Documents',
                    headerShown: false,
                    animation: 'shift', // https://reactnavigation.org/docs/bottom-tab-navigator?config=dynamic#animations
                    tabBarLabelStyle: { fontSize: 14 },
                    tabBarIcon: ({ color }) => (
                        <SymbolView
                            size={32}
                            name="rectangle.stack.fill"
                            tintColor={color}
                        />
                    ),
                }}
            />

            {/* Profile Screen */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    animation: 'shift', // https://reactnavigation.org/docs/bottom-tab-navigator?config=dynamic#animations
                    tabBarLabelStyle: { fontSize: 14 },
                    tabBarIcon: ({ color }) => (
                        <SymbolView
                            size={32}
                            name="person.crop.circle" // person.crop.square person.fill
                            tintColor={color}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout
