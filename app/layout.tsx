import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Public_Sans } from 'next/font/google'
import { CampusFixProvider } from '@/components/campusfix/campusfix-provider'
import './globals.css'

const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' })

export const metadata: Metadata = {
  title: 'CAMPUSFIX | Gestión de mantenimiento universitario',
  description:
    'Sistema universitario para reportar y dar seguimiento a incidencias de infraestructura en los edificios del campus.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1e3a6e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={publicSans.variable}>
      <body className="font-sans antialiased">
        <CampusFixProvider>{children}</CampusFixProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
