import { StylesProvider } from './styles-provider'
import AuthLayout from '../components/authLayout'
import './styles/globals.css'

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
                <StylesProvider>
                    <AuthLayout>{children}</AuthLayout>
                </StylesProvider>
            </body>
        </html>
    )
}
