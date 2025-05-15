/**
 * App Layout for Authentication based on
 * https://medium.com/@coby09/building-seamless-navigation-in-expo-router-tabs-modals-and-stacks-2df1a5522321
 * https://github.com/Coby-Sonn/react-native-expo-navigation-example/blob/main/app/index.jsx
 */
import { Stack } from 'expo-router'

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="login" />
        </Stack>
    )
}
