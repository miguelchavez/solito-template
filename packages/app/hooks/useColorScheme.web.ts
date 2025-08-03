// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native
// but can be achieved using a styling library like Nativewind.
import { useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import { useTheme } from 'next-themes'

export function useColorScheme() {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
    const { setTheme } = useTheme()

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setColorScheme(colorScheme)
            setTheme(colorScheme ?? 'light') // for tailwind/shadcn
        })

        return () => {
            subscription.remove()
        }
    }, [])

    return colorScheme
}
