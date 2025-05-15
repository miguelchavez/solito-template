import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import { StyleSheet, StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function BlurTabBarBackground() {
    return (
        <View style={styles.container}>
            <View style={styles.background}>
                {Array.from(Array(20).keys()).map((i) => (
                    <View
                        key={`box-${i}`}
                        // style={[
                        //     styles.box,
                        //     i % 2 === 1 ? styles.boxOdd : styles.boxEven,
                        // ]}
                    />
                ))}
            </View>
            <BlurView
                // System chrome material automatically adapts to the system's theme
                // and matches the native tab bar appearance on iOS.
                tint="light" //"systemChromeMaterial"
                intensity={100}
                style={StyleSheet.absoluteFill}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurContainer: {
        flex: 1,
        padding: 20,
        margin: 16,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
    },
    background: {
        flex: 1,
        flexWrap: 'wrap',
        ...StyleSheet.absoluteFillObject,
    },
    box: {
        width: '25%',
        height: '20%',
    },
    boxEven: {
        backgroundColor: '#DAB8FC', // #D4C4F4  #FF85FF #CFB8FC #DAB8FC
    },
    boxOdd: {
        backgroundColor: '#FF85FF', // #D4C4F4  #FF85FF #CFB8FC #DAB8FC
    },
})

export function useBottomTabOverflow() {
    const tabHeight = useBottomTabBarHeight()
    const { bottom, top } = useSafeAreaInsets()
    return tabHeight - bottom
}

export function useTopTabOverflow() {
    const statusBarHeight = StatusBar.currentHeight ?? 50
    const { bottom, top } = useSafeAreaInsets()
    //   console.log('statusBarHeight', statusBarHeight)
    //   console.log('top', top)
    //   console.log('bottom', bottom)
    return statusBarHeight - top
}
