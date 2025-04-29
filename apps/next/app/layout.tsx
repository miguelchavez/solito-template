import { StylesProvider } from './styles-provider'
import './globals.css'

export const metadata = {
    title: 'Solito App',
    description: 'Monorepo based in solito',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>
                <StylesProvider>{children}</StylesProvider>
            </body>
        </html>
    )
}
