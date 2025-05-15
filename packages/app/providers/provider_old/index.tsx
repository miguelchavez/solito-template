import { SafeArea } from 'app/provider/safe-area'

export function Provider({
    children,
}: {
    children: React.ReactElement /*React.ReactNode*/
}) {
    return <SafeArea>{children}</SafeArea>
}
