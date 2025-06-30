'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { getCurrentUser } from 'app/auth/firebase'

import { Text, View } from 'react-native'

const Test = () => {
    const user = getCurrentUser()

    return (
        <div className="p-2 flex-1">
            <p className="text-base text-violet-900 underline">
                1 The raw house ™ cold press juice. Times square is a major
                commercial intersection, tourist destination, entertainment
                center and neighborhood in the midtown manhattan section of new
                york city at the junction of broadway and seventh.
                {user ? `Welcome back ${user.displayName}!` : 'Please log in.'}
            </p>
            <View className="bg-orange-500">
                <Text className="text-base text-violet-900 underline">
                    2 The raw house ™ cold press juice. Times square is a major
                    commercial intersection, tourist destination, entertainment
                    center and neighborhood in the midtown manhattan section of
                    new york city at the junction of broadway and seventh.
                    {user
                        ? `Welcome back ${user.displayName}!`
                        : 'Please log in.'}
                </Text>
            </View>
            <p>
                3 Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus,
                tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus. Nullam id dolor
            </p>
        </div>
    )
}
export default Test
