import { StylesProvider } from './styles-provider'
import { ThemeProvider } from '@/lib/components/themeProvider'
import '@/styles/globals.css'

export const metadata = {
    title: 'Solito App',
    description: 'Monorepo based in solito',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const isDevelopment =
        process?.env?.NODE_ENV?.toLowerCase() === 'development' || false
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                {isDevelopment && (
                    <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
                )}
            </head>
            <body className="min-h-screen bg-background text-base antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StylesProvider>{children}</StylesProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
