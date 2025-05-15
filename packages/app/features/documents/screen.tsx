import { useRouter } from 'solito/navigation'
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    useWindowDimensions,
} from 'react-native'

import { useThemeColor } from '@hooks/useThemeColor'

export function DocumentsScreen() {
    const router = useRouter()
    const bgColor = useThemeColor('background')
    const textColor = useThemeColor('text')
    const linkColor = useThemeColor('tertiary')
    const { width, height } = useWindowDimensions()
    const styles = StyleSheet.create({
        view: {
            flex: 1,
            padding: 16,
            // paddingTop: width > height ? 32 : 16, // fix para el stack header en horizontal
            gap: 32,
            backgroundColor: bgColor, // Added background color
            color: textColor,
        },
        text: {
            color: textColor,
        },
    })

    return (
        <View style={styles.view}>
            <H1>Documents</H1>
        </View>
    )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
    const textColor = useThemeColor('text')
    return (
        <Text
            style={{
                color: textColor,
                textAlign: 'center',
                fontFamily: 'Inter',
                fontWeight: '800',
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
