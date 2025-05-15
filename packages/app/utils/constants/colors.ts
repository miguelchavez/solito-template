/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#E129F1' // #E129F1 #f829ff #f0d7fc
const tintColorDark = '#fafafa' // #6c97fa #fafafa
const tintSecondary = '#fc2d79' //  #fc2d79 #ff0073  #ff00aa #ff005d
const tintSecondaryDark = '#00d3da' //rgb(0, 210, 218) #ff0073  #ff00aa #ff005d

const activeTabColor = '#f829ff' // #7c21fc  c616fc  #fa0255
const activeTabBackground = '#f0d7fc' // #e8c3fa #e5b6fc #e0a9fb
const activeTabBackgroundDark = '#e286f9' // #e286f9
const inactiveIconColor = '#949494' // gris

const textButtonColorLight = '#fff' // #f0d7fc  #e8c3fa #e5b6fc #e0a9fb
const textButtonColorDark = '#fff' //rgb(230, 177, 255)  #e8c3fa #e5b6fc #e0a9fb

const textSecondaryColorLight = '#6c97fa' // #6c97fa
const textSecondaryColorDark = '#cacaca' // #cacaca

const textTertiaryColorLight = '#2c99ff' // #2c99ff
const textTertiaryColorDark = '#9ccfff' // #9ccfff

const menuTitleColor = '#7e7e7e' // #7e7e7e
const menuTitleColorDark = '#cfcfcf' // #cfcfcf

export const Colors = {
    light: {
        primary: '#890253',
        secondary: '#0E7AFE', // apple blue
        tertiary: '#FF5A5F',
        text: '#11181C',
        background: '#EAEAEA', // #D4C4F4  #FF85FF #CFB8FC #DAB8FC
        tint: tintColorLight,
        icon: '#d5c5ff', // #d5c5ff #687076
        textButton: textButtonColorLight,
        softWhite: '#FEFEFE', // #FAFAFA
        softBackground: activeTabBackground,
        lightBackground: '#e0a9fb', // #efb7fb  #e5b6fc #e8c3fa,
        sidebarBackground: '#efb7fb', // #FAC3F2 #FF8B88, #FF7C78, #FF6D68, Tangerine #FA936D, Salmon #FF7F50, #FA8072,  #FD959F, #FCBBC2, #FAAACB, #FAC3F2, #E4C1F9, #d5c5ff,
        sidebarSecondaryBackground: '#f2f2f2',
        inactiveIcon: inactiveIconColor,
        activeTabBackground: activeTabBackground,
        tabIconDefault: '#687076', // #687076
        tabIconSelected: tintColorLight,
        buttonColor: tintColorLight,
        secondaryButtonColor: tintSecondary,
        secondaryTextColor: textSecondaryColorLight,
        tertiaryTextColor: textTertiaryColorLight,
        menuTitleColor: menuTitleColor,
    },
    dark: {
        primary: '#D4C4F4',
        secondary: '#00BFFF',
        tertiary: '#FF5A5F',
        text: '#ECEDEE', // #ECEDEE #FAC3F2
        background: '#202020', //#202020 #323637
        tint: tintColorDark,
        icon: '#9BA1A6', // #9BA1A6
        textButton: textButtonColorDark,
        buttonColor: tintColorDark,
        softWhite: '#303030', // #303030
        softBackground: '#2b2b2b',
        lightBackground: '#403A3E', // #403A3E
        sidebarBackground: '#890253', // '#87287A', //'#710062', //'#1D3D47',
        sidebarSecondaryBackground: '#f7e3fc',
        inactiveIcon: inactiveIconColor,
        activeTabBackground: activeTabBackgroundDark,
        tabIconDefault: '#9BA1A6', // #9BA1A6
        tabIconSelected: tintColorDark,
        secondaryButtonColor: tintSecondaryDark,
        secondaryTextColor: textSecondaryColorDark,
        tertiaryTextColor: textTertiaryColorDark,
        menuTitleColor: menuTitleColorDark,
    },
}
