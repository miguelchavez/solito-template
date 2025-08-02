'use client'

import { ButtonProps } from 'react-native'
import { Button } from '@components/ui/button'

type Props = {
    children?: React.ReactNode
    title?: string
    onPress: () => void
    props?: any
}

const MyButton: React.FC<ButtonProps & { children?: React.ReactNode }> = ({
    title,
    children,
    onPress,
    ...props
}) => {
    return (
        <Button {...props} onClick={onPress}>
            {title}
            {children}
        </Button>
    )
}

export { MyButton }
