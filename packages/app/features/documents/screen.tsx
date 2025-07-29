import { useRouter } from 'solito/navigation'
import { View, Text, Platform, useWindowDimensions } from 'react-native'

import { useThemeColor } from '@hooks/useThemeColor'

export function DocumentsScreen() {
    const router = useRouter()
    const bgColor = useThemeColor('background')
    const textColor = useThemeColor('text')
    const linkColor = useThemeColor('tertiary')
    const { width, height } = useWindowDimensions()

    return (
        <View
            style={{
                flex: 1,
                width: '100dvw', //'100vw',
                height: '100dvh', //'100vh',
                padding: 16,
                gap: 32,
                // paddingTop: width > height ? 32 : 16, // fix para el stack header en horizontal
                backgroundColor: bgColor, // Added background color
                color: textColor,
            }}
        >
            <H1>Documents</H1>
        </View>
    )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
    const textColor = useThemeColor('text')
    return (
        <Text
            style={{
                fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
                fontWeight: 'bold',
                color: textColor,
                textAlign: 'center',
                fontSize: 26,
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
    const textColor = useThemeColor('text') // default text color
    return (
        <Text
            selectable={selectable}
            style={{
                color: textColor,
                fontSize: 18,
                fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
                textAlign: 'justify',
                ...style, // override style passed in props
            }}
            {...props}
        >
            {children}
        </Text>
    )
}
