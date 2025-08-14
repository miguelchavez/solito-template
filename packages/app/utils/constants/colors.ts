/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 *
 * Based on the tailiwind color theme from apps/next/styles/globals.css
 *
 */

const softPurpleBackground = '#e1d8fc' // #F9F1FE
const softPurpleBackgroundDark = '#684EB5'
const tintColorLight = '#E129F1'
const tintColorDark = '#fafafa'
const tintSecondary = '#fc2d79'
const tintSecondaryDark = '#00d3da'
const activeTabColor = '#f829ff'
const activeTabBackground = '#f0d7fc'
const activeTabBackgroundDark = '#e286f9'
const inactiveIconColor = '#949494'
const textButtonColorLight = '#fff'
const textButtonColorDark = '#fff'
const textSecondaryColorLight = '#6c97fa'
const textSecondaryColorDark = '#cacaca'
const textTertiaryColorLight = '#2c99ff'
const textTertiaryColorDark = '#9ccfff'
const menuTitleColor = '#7e7e7e'
const menuTitleColorDark = '#cfcfcf'

export const Colors = {
    light: {
        background: '#f0e9fd',
        foreground: '#2a2a4a',
        card: '#ffffff',
        cardForeground: '#2a2a4a',
        popover: '#ffffff',
        popoverForeground: '#2a2a4a',
        primary: '#6e56cf',
        // primary: '#f632af',
        primaryForeground: '#ffffff',
        secondary: '#e4dfff',
        // secondary: '#0E7AFE',
        secondaryForeground: '#4a4080',
        tertiary: '#FF5A5F',
        muted: '#f0f0fa',
        mutedForeground: '#6c6c8a',
        accent: '#d8e6ff',
        accentForeground: '#2a2a4a',
        destructive: '#ff5470',
        destructiveForeground: '#ffffff',
        border: '#e0e0f0',
        input: '#e0e0f0',
        ring: '#6e56cf',
        chart1: '#6e56cf',
        chart2: '#9e8cfc',
        chart3: '#5d5fef',
        chart4: '#7c75fa',
        chart5: '#4740b3',
        sidebar: '#f0f0fa',
        sidebarForeground: '#2a2a4a',
        sidebarPrimary: '#6e56cf',
        sidebarPrimaryForeground: '#ffffff',
        sidebarAccent: '#d8e6ff',
        sidebarAccentForeground: '#2a2a4a',
        sidebarBorder: '#e0e0f0',
        sidebarRing: '#6e56cf',
        loginBackground: softPurpleBackground,
        // mios
        tint: '#6e56cf', //tintColorLight,
        icon: '#6e56cf',
        text: '#11181C',
        textButton: '#fff',
        softWhite: '#FEFEFE',
        softBackground: activeTabBackground,
        lightBackground: '#e0a9fb',
        sidebarBackground: '#efb7fb',
        sidebarSecondaryBackground: '#f2f2f2',
        inactiveIcon: inactiveIconColor,
        activeTabBackground: activeTabBackground,
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        buttonColor: '#6e56cf', //tintColorLight,
        secondaryButtonColor: tintSecondary,
        secondaryTextColor: textSecondaryColorLight,
        tertiaryTextColor: textTertiaryColorLight,
        menuTitleColor: menuTitleColor,
    },
    dark: {
        background: '#0f0f1a',
        foreground: '#e2e2f5',
        card: '#1a1a2e',
        cardForeground: '#e2e2f5',
        popover: '#1a1a2e',
        popoverForeground: '#e2e2f5',
        primary: '#a48fff',
        // primary: '#D4C4F4',
        primaryForeground: '#0f0f1a',
        secondary: '#2d2b55',
        // secondary: '#00BFFF',
        secondaryForeground: '#c4c2ff',
        // tertiary: '#FF5A5F',
        muted: '#222244',
        mutedForeground: '#a0a0c0',
        accent: '#303060',
        accentForeground: '#e2e2f5',
        destructive: '#ff5470',
        destructiveForeground: '#ffffff',
        border: '#303052',
        input: '#303052',
        ring: '#a48fff',
        chart1: '#a48fff',
        chart2: '#7986cb',
        chart3: '#64b5f6',
        chart4: '#4db6ac',
        chart5: '#ff79c6',
        sidebar: '#1a1a2e',
        sidebarForeground: '#e2e2f5',
        sidebarPrimary: '#a48fff',
        sidebarPrimaryForeground: '#0f0f1a',
        sidebarAccent: '#303060',
        sidebarAccentForeground: '#e2e2f5',
        sidebarBorder: '#303052',
        sidebarRing: '#a48fff',
        loginBackground: softPurpleBackgroundDark,
        // mios
        text: '#ECEDEE',
        tint: tintColorDark,
        icon: '#9BA1A6',
        textButton: textButtonColorDark,
        buttonColor: tintColorDark,
        softWhite: '#4F4E4E', //'#303030',
        softBackground: '#2b2b2b',
        lightBackground: '#403A3E',
        sidebarBackground: '#890253',
        sidebarSecondaryBackground: '#f7e3fc',
        inactiveIcon: inactiveIconColor,
        activeTabBackground: activeTabBackgroundDark,
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        secondaryButtonColor: tintSecondaryDark,
        secondaryTextColor: textSecondaryColorDark,
        tertiaryTextColor: textTertiaryColorDark,
        menuTitleColor: menuTitleColorDark,
    },
}
