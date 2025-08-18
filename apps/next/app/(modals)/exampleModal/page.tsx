'use client'

// import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

import { useThemeColor } from '@hooks/useThemeColor'

/**
 * ExampleModal component renders a modal page with a button to close the modal.
 */
const ExampleModal = () => {
    // const router = useRouter()
    const bgColor = useThemeColor('background')
    const textColor = useThemeColor('text')

    return (
        <div
            style={{
                flex: 1,
                width: '100dvw',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgColor,
            }}
        >
            <p
                style={{
                    fontSize: 20,
                    marginBottom: 20,
                    color: textColor,
                }}
            >
                This is a modal page
            </p>
        </div>
    )
}

export default ExampleModal
