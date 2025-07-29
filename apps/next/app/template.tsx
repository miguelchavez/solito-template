'use client'

// import { motion } from 'framer-motion'
import Animated from 'react-native-reanimated'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
    return (
        // <motion.div
        //     // className="flex-1 bg-slate-50"
        //     initial={{ y: 30, opacity: 0 }}
        //     animate={{ y: 0, opacity: 1 }}
        //     exit={{ y: -3, opacity: 0 }}
        //     transition={{
        //         ease: 'easeInOut',
        //         duration: 0.9,
        //         y: { type: 'spring', delay: 0, duration: 0.5, mass: 0.8 },
        //     }}
        // >
        //     {children}
        // </motion.div>

        <Animated.View entering={FadeIn} exiting={FadeOut}>
            {children}
        </Animated.View>
    )
}
