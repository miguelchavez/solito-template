'use client'

import { useRouter } from 'solito/navigation'
import { useState, useEffect, useContext } from 'react'
import { useTheme } from 'next-themes'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    useWindowDimensions,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform,
} from 'react-native'
import { enUS, es } from 'date-fns/locale'

import Icono from 'app/components/icons'
// import { P, H1, H2 } from 'app/components/typography'
import { signOut } from 'app/auth/firebase'
import { useAuthState } from 'app/auth/firebase'
import { useThemeColor } from '@hooks/useThemeColor'
import { SettingsContext } from 'app/providers/settingsContextProvider'

import {
    format,
    formatDistanceToNow,
    formatDuration,
    formatRelative,
    subDays,
} from 'date-fns'

export function ProfileScreen() {
    const router = useRouter()
    const { setTheme } = useTheme() // for tailwind/shadcn
    const { user, state } = useAuthState()
    const { settings, updateSettings } = useContext(SettingsContext)
    const menuTitle = useThemeColor('menuTitleColor')
    const textColor = useThemeColor('text')
    const textSecondaryColor = useThemeColor('secondaryTextColor')
    const textTertiaryColor = useThemeColor('tertiaryTextColor')
    const softWhite = useThemeColor('softWhite')
    const { width, height } = useWindowDimensions()

    const styles = StyleSheet.create({
        /** Content */
        contentFooter: {
            marginTop: 24,
            fontSize: 13,
            fontWeight: '500',
            textAlign: 'center',
        },
        /** Section */
        sectionTitle: {
            letterSpacing: 0.33,
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
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 12,
        },
        profileAvatar: {
            width: 60,
            height: 60,
            borderRadius: 9999,
        },
        profileBody: {
            marginRight: 'auto',
        },
        profileHandle: {
            fontWeight: '400',
        },
        profileDetail: {
            textAlign: 'justify',
            width: '100%',
        },
        /** Row */
        row: {
            // height: 44,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        rowFirst: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },
        rowLabel: {
            letterSpacing: 0.24,
        },
        rowSpacer: {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
        },
        rowLast: {
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
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
        setTheme(darkmode ? 'dark' : 'light') // for tailwind/shadcn
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
        if (user != null && state === 'authenticated') {
            const f = formatDistanceToNow(
                new Date(user?.metadata?.lastSignInTime ?? ''),
                {
                    addSuffix: true,
                    locale: enUS,
                },
            )
            setTimeAgo(f)
        }
    }, [])

    const PStyle = {
        fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
        fontSize: 13,
        color: textColor,
    }

    return (
        <View
            style={{
                flex: 1,
                gap: 8,
                // maxWidth: '60%',
                minWidth: '50%',
                margin: 'auto',
            }}
        >
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <Text
                    style={{
                        ...styles.sectionTitle,
                        ...PStyle,
                        marginLeft: 12,
                        fontWeight: '400',
                        color: menuTitle,
                    }}
                >
                    Account
                </Text>
                <View style={styles.sectionBody}>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={{
                            ...styles.profile,
                            padding: 12,
                            marginTop: 10,
                            backgroundColor: softWhite,
                        }}
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
                            <Text
                                style={{
                                    ...PStyle,
                                    fontSize: 15,
                                    fontWeight: '600',
                                }}
                            >
                                {user?.isAnonymous
                                    ? 'Guest'
                                    : user?.displayName}
                            </Text>
                            <Text
                                style={{
                                    ...styles.profileHandle,
                                    color: textSecondaryColor,
                                }}
                            >
                                {user?.email ?? 'guest@user.com'}
                            </Text>
                            <Text
                                style={{
                                    ...PStyle,
                                    ...styles.profileDetail,
                                    color: menuTitle,
                                    fontWeight: '300',
                                }}
                            >
                                Signed in {timeAgo}
                            </Text>
                        </View>
                        <View style={styles.rowSpacer} />
                        <Icono
                            size={22}
                            sfName="chevron.right"
                            DIName="chevron-right"
                            tintColor={menuTitle}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 12, paddingTop: 4 }}>
                    <Text
                        style={{
                            ...PStyle,
                            ...styles.sectionTitle,
                            margin: 8,
                            marginLeft: 12,
                            fontWeight: '400',
                            color: menuTitle,
                        }}
                    >
                        Preferences
                    </Text>
                    <View
                        style={{
                            ...styles.sectionBody,
                            backgroundColor: softWhite,
                        }}
                    >
                        <View
                            style={{
                                ...styles.rowFirst,
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                    }}
                                >
                                    Language
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Text
                                    style={{
                                        ...PStyle,
                                        marginRight: 4,
                                        color: menuTitle,
                                        fontWeight: '500',
                                    }}
                                >
                                    English
                                </Text>
                                <Icono
                                    size={19}
                                    sfName="chevron.right"
                                    DIName="chevron-right"
                                    tintColor={menuTitle}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* Do not show small sidebar switch on web */}
                        <View
                            style={{
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                    }}
                                >
                                    System Settings for Dark Mode
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
                        <View
                            style={{
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                    }}
                                >
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
                        <View
                            style={{
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                        color: textColor,
                                    }}
                                >
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
                        <View
                            style={{
                                ...styles.rowLast,
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                        color: textColor,
                                    }}
                                >
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
                <View style={{ paddingVertical: 12, paddingTop: 4 }}>
                    <Text
                        style={{
                            ...PStyle,
                            ...styles.sectionTitle,
                            margin: 8,
                            marginLeft: 12,
                            fontSize: 13,
                            fontWeight: '400',
                            color: menuTitle,
                        }}
                    >
                        Resources
                    </Text>
                    <View
                        style={{
                            ...styles.sectionBody,
                            backgroundColor: softWhite,
                        }}
                    >
                        <View
                            style={{
                                ...styles.rowFirst,
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                    }}
                                >
                                    Contact Us
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Icono
                                    size={19}
                                    sfName="chevron.right"
                                    DIName="chevron-right"
                                    tintColor={menuTitle}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                    }}
                                >
                                    Report Bug
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Icono
                                    size={19}
                                    sfName="chevron.right"
                                    DIName="chevron-right"
                                    tintColor={menuTitle}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                ...styles.rowLast,
                                paddingLeft: 16,
                                borderTopWidth: 1,
                                borderColor: softWhite,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...PStyle,
                                        ...styles.rowLabel,
                                    }}
                                >
                                    Terms and Privacy
                                </Text>
                                <View style={styles.rowSpacer} />
                                <Icono
                                    size={19}
                                    sfName="chevron.right"
                                    DIName="chevron-right"
                                    tintColor={menuTitle}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ paddingVertical: 12, paddingTop: 4 }}>
                    <View
                        style={{
                            ...styles.sectionBody,
                            backgroundColor: softWhite,
                        }}
                    >
                        <View
                            style={{
                                paddingLeft: 16,
                                borderColor: softWhite,
                                borderTopWidth: 1,
                                ...styles.rowFirst,
                                ...styles.rowLast,
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    signOut()
                                }}
                                style={{
                                    ...styles.row,
                                    paddingRight: 12,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...styles.rowLabel,
                                        color: textTertiaryColor,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        alignContent: 'center',
                                        width: '100%',
                                    }}
                                >
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={{ ...styles.contentFooter, color: menuTitle }}>
                    Solito Template
                </Text>
            </ScrollView>
        </View>
    )
}
