import { Text, Platform } from 'react-native'
import { useThemeColor } from '@hooks/useThemeColor'

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
                fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
                textAlign: 'justify',
                color: selectable ? linkColor : textColor,
                ...style,
            }}
            {...props}
        >
            {children}
        </Text>
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
                fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
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
                fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
                fontWeight: '600',
                fontSize: 20,
                ...style,
            }}
        >
            {children}
        </Text>
    )
}

export { P, H1, H2 }
