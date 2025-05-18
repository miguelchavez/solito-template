import { useRouter } from 'solito/navigation'
import { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    useWindowDimensions,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native'
import { SymbolView } from 'expo-symbols'
import * as Device from 'expo-device'
import { getCurrentUser, signOut } from 'app/auth/firebase'

import { useThemeColor } from '@hooks/useThemeColor'

import { useContext } from 'react'
import { SettingsContext } from 'app/providers/settingsContextProvider'

import { es } from 'date-fns/locale'
import {
    format,
    formatDistanceToNow,
    formatDuration,
    formatRelative,
    subDays,
} from 'date-fns'

export function ProfileScreen() {
    const router = useRouter()
    const user = getCurrentUser()
    const { settings, updateSettings } = useContext(SettingsContext)
    const menuTitle = useThemeColor('menuTitleColor')
    const bgColor = useThemeColor('background')
    const textColor = useThemeColor('text')
    const textSecondaryColor = useThemeColor('secondaryTextColor')
    const textTertiaryColor = useThemeColor('tertiaryTextColor')
    const softWhite = useThemeColor('softWhite')

    const deviceType = Device.deviceType
    const isPhone = deviceType == Device.DeviceType.PHONE

    const { width, height } = useWindowDimensions()

    const styles = StyleSheet.create({
        view: {
            flex: 1,
            padding: 14,
            paddingLeft: 24,
            paddingRight: 24,
            gap: 8,
            backgroundColor: bgColor, // Added background color
            color: textColor,
        },
        text: {
            color: textColor,
        },
        card: {
            padding: 10,
            paddingLeft: 18,
            backgroundColor: softWhite,
            borderRadius: 10,
        },
        subtitle: {
            color: textTertiaryColor,
            fontSize: 16,
            fontWeight: 'normal',
        },
        description: {
            color: menuTitle,
            fontSize: 14,
            fontWeight: '300',
            width: '100%',
        },
        /** Content */
        content: {
            paddingHorizontal: 16,
        },
        contentFooter: {
            marginTop: 24,
            fontSize: 13,
            fontWeight: '500',
            textAlign: 'center',
            // color: '#a69f9f',
            color: menuTitle,
        },
        /** Section */
        section: {
            paddingVertical: 12,
        },
        sectionTitle: {
            margin: 8,
            marginLeft: 12,
            // paddingTop: 10,
            fontSize: 13,
            // fontSize: 16,
            letterSpacing: 0.33,
            fontWeight: '500',
            // fontWeight: '300',
            // color: '#a69f9f',
            color: menuTitle,
            textTransform: 'uppercase',
        },
        sectionBody: {
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
        },
        /** Profile */
        profile: {
            padding: 12,
            backgroundColor: '#fff',
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        profileAvatar: {
            width: 60,
            height: 60,
            borderRadius: 9999,
            marginRight: 12,
        },
        profileBody: {
            marginRight: 'auto',
        },
        profileName: {
            fontSize: 18,
            fontWeight: '600',
            color: textColor, // '#292929',
        },
        profileHandle: {
            marginTop: 2,
            fontSize: 16,
            fontWeight: '400',
            // color: '#858585',
            color: textSecondaryColor,
        },
        profileDetail: {
            color: menuTitle,
            fontSize: 14,
            fontWeight: '300',
            textAlign: 'justify',
            width: '100%',
        },
        /** Row */
        row: {
            // justifyContent: 'space-between',
            // marginVertical: 4,
            height: 44,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingRight: 12,
        },
        rowWrapper: {
            paddingLeft: 16,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#f0f0f0',
        },
        rowFirst: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },
        rowLabel: {
            fontSize: 16,
            letterSpacing: 0.24,
            color: textColor,
        },
        rowSpacer: {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
        },
        rowValue: {
            fontSize: 16,
            fontWeight: '500',
            color: menuTitle, //'#ababab',
            marginRight: 4,
        },
        rowLast: {
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
        },
        rowLabelLogout: {
            width: '100%',
            textAlign: 'center',
            fontWeight: '600',
            color: textTertiaryColor, // '#dc2626',
        },
    })

    const [bigIcons, setBigIcons] = useState<boolean | undefined>(undefined)
    const [darkmode, setDarkmode] = useState<boolean | undefined>(undefined)
    const [device, setDevice] = useState<boolean | undefined>(undefined)
    const [timeAgo, setTimeAgo] = useState('')

    const handleSettingsUpdate = () => {
        // This updates de context and saves it to AsyncStorage
        const isBigIcons = settings?.bottomTabBarSize === 'large'
        const updateTabBarSize =
            isBigIcons != bigIcons && bigIcons !== undefined
        const newTheme = device ? 'system' : darkmode ? 'dark' : 'light'
        const updateTheme =
            newTheme != settings?.theme &&
            device !== undefined &&
            darkmode !== undefined
        if (updateTheme || updateTabBarSize) {
            updateSettings({
                theme: newTheme,
                bottomTabBarSize: bigIcons ? 'large' : 'small',
                isAgreementAccepted: settings.isAgreementAccepted, // Not updated here
            })
        }
    }

    useEffect(() => {
        // If bigIcons or darkmode or device changes, update the settings on the context, and save it to AsyncStorage
        handleSettingsUpdate()
    }, [bigIcons, darkmode, device])

    useEffect(() => {
        if (settings) {
            // update state from settings
            const isBigIcons = settings?.bottomTabBarSize === 'large'
            const isDarkMode = settings?.theme == 'dark'
            const isSystemMode = settings?.theme == 'system'
            if (isBigIcons !== bigIcons) setBigIcons(isBigIcons)
            if (isDarkMode !== darkmode) setDarkmode(isDarkMode)
            if (isSystemMode !== device) setDevice(isSystemMode)
        }
    }, [settings])

    useEffect(() => {
        if (user) {
            // console.log('[ auth :: data ]:', user)
            const f = formatDistanceToNow(
                new Date(user.metadata.lastSignInTime ?? ''),
                {
                    addSuffix: true,
                    locale: es,
                },
            )
            setTimeAgo(f)
        }
    }, [])

    return (
        <View style={styles.view}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.section, { paddingTop: 4 }]}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.sectionBody}>
                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                            }}
                            style={styles.profile}
                        >
                            <Image
                                alt={user?.displayName ?? 'Guest User'}
                                source={{
                                    uri:
                                        user?.photoURL ??
                                        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                                }}
                                style={styles.profileAvatar}
                            />
                            <View style={styles.profileBody}>
                                <Text style={styles.profileName}>
                                    {user?.isAnonymous
                                        ? 'Guest'
                                        : user?.displayName}
                                </Text>
                                <Text style={styles.profileHandle}>
                                    {user?.email ?? 'guest@user.com'}
                                </Text>
                                <Text style={styles.profileDetail}>
                                    Signed in {timeAgo}
                                </Text>
                            </View>
                            <SymbolView
                                size={22}
                                name="chevron.right"
                                tintColor={menuTitle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.sectionBody}>
                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Language</Text>
                                <View style={styles.rowSpacer} />
                                <Text style={styles.rowValue}>English</Text>
                                <SymbolView
                                    size={19}
                                    name="chevron.right"
                                    tintColor={menuTitle}
                                    // color="#bcbcbc"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowWrapper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>
                                    Small Sidebar on tablets
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={bigIcons}
                                    disabled={isPhone}
                                    onChange={() =>
                                        setBigIcons((prev) => !prev)
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.rowWrapper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>
                                    Use System Settings for Dark Mode
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={device}
                                    onChange={() =>
                                        setDevice((prev) => {
                                            const newValue = !prev
                                            // If newValue of device is true and darkmode is true, set darkmode to false
                                            if (newValue && darkmode) {
                                                setDarkmode(false)
                                            }
                                            return newValue
                                        })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.rowWrapper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>
                                    Force Dark mode
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={darkmode}
                                    onChange={() => {
                                        setDarkmode((prev) => {
                                            const newValue = !prev
                                            // If newValue of darkmode is true and device is true, set device to false
                                            if (newValue && device) {
                                                setDevice(false)
                                            }
                                            return newValue
                                        })
                                    }}
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.rowWrapper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>
                                    Email Notifications
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    // onValueChange={(emailNotifications) =>
                                    //     setForm({ ...form, emailNotifications })
                                    // }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    // value={form.emailNotifications}
                                />
                            </View>
                        </View>
                        <View style={[styles.rowWrapper, styles.rowLast]}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>
                                    Push Notifications
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    // onValueChange={(pushNotifications) =>
                                    //     setForm({ ...form, pushNotifications })
                                    // }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    // value={form.pushNotifications}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resources</Text>
                    <View style={styles.sectionBody}>
                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Contact Us</Text>
                                <View style={styles.rowSpacer} />
                                <SymbolView
                                    size={19}
                                    name="chevron.right"
                                    tintColor={menuTitle}
                                    // color="#bcbcbc"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Report Bug</Text>
                                <View style={styles.rowSpacer} />
                                <SymbolView
                                    size={19}
                                    name="chevron.right"
                                    tintColor={menuTitle}
                                    // color="#bcbcbc"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>
                                    Rate in App Store
                                </Text>
                                <View style={styles.rowSpacer} />
                                <SymbolView
                                    size={19}
                                    name="chevron.right"
                                    tintColor={menuTitle}
                                    // color="#bcbcbc"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.rowWrapper, styles.rowLast]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>
                                    Terms and Privacy
                                </Text>
                                <View style={styles.rowSpacer} />
                                <SymbolView
                                    size={19}
                                    name="chevron.right"
                                    tintColor={menuTitle}
                                    // color="#bcbcbc"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionBody}>
                        <View
                            style={[
                                styles.rowWrapper,
                                styles.rowFirst,
                                styles.rowLast,
                                { alignItems: 'center' },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    signOut()
                                }}
                                style={styles.row}
                            >
                                <Text
                                    style={[
                                        styles.rowLabel,
                                        styles.rowLabelLogout,
                                    ]}
                                >
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={styles.contentFooter}>Alfred version 2.00</Text>
            </ScrollView>
        </View>
    )
}

const H1 = ({
    children,
    style,
}: {
    children: React.ReactNode
    style?: any
}) => {
    const textColor = useThemeColor('text')
    return (
        <Text
            style={{
                color: textColor,
                textAlign: 'center',
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: 26,
                ...style,
            }}
        >
            {children}
        </Text>
    )
}

const H2 = ({
    children,
    style,
}: {
    children: React.ReactNode
    style?: any
}) => {
    const textColor = useThemeColor('text')
    return (
        <Text
            style={{
                color: textColor,
                textAlign: 'center',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: 20,
                ...style,
            }}
        >
            {children}
        </Text>
    )
}

const P = ({
    children,
    style,
    selectable,
    props,
}: {
    children: React.ReactNode
    props?: any
    style?: any
    selectable?: boolean
}) => {
    const textColor = useThemeColor('text')
    const linkColor = useThemeColor('secondary')
    return (
        <Text
            selectable={selectable}
            style={{
                fontFamily: 'Inter',
                textAlign: 'justify',
                color: selectable ? linkColor : textColor,
                fontSize: 18,
                ...style,
            }}
            {...props}
        >
            {children}
        </Text>
    )
}
