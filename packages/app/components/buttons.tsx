import { Button, ButtonProps } from 'react-native'

type Props = {
    children?: React.ReactNode
    title?: string
    onPress?: () => void
    props?: any
}
// React.ComponentProps<'button'>

const MyButton: React.FC<ButtonProps & { children?: React.ReactNode }> = ({
    title,
    children,
    onPress,
    ...props
}) => {
    return <Button title={title} {...props} />
}

export { MyButton }
