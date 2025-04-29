import { View, Text, Button, Pressable } from 'react-native'
import { ReactElement } from 'react'
import { useFirebaseAuth } from './hooks'
import { signInAnonymously } from './index'

const AuthGuard = ({ children }: { children: ReactElement }) => {
    const auth = useFirebaseAuth()
    if (!auth) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    title="SIGN IN"
                    color="'#D4CDF4'"
                    onPress={() => signInAnonymously()}
                />
            </View>
        )
    }
    return <>{children}</>
}
export default AuthGuard
