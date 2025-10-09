import { Inter, JetBrains_Mono, Dancing_Script, Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { organizationSchema, websiteSchema, localBusinessSchema } from './metadata';

export const metadata = {
  metadataBase: new URL('https://earthlixir.net'),
  title: {
    default: 'Earthlixir - Premium African Herbal Tea | Cameroonian Wellness Blends',
    template: '%s | Earthlixir',
  },
  description: 'Discover authentic Cameroonian herbal tea blends. 100% natural, organic hibiscus, lemongrass, ginger, cinnamon & cloves. Proudly made in Cameroon, loved worldwide. Shop premium wellness teas.',
  keywords: [
    'Cameroonian tea',
    'African herbal tea',
    'organic tea',
    'hibiscus tea',
    'lemongrass tea',
    'ginger tea',
    'wellness tea',
    'natural tea',
    'Cameroon tea',
    'herbal infusion',
    'healthy tea',
    'eco-friendly tea',
    'sustainable tea',
    'African wellness',
    'premium herbal tea'
  ],
  authors: [{ name: 'Earthlixir' }],
  creator: 'Earthlixir',
  publisher: 'Earthlixir',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Earthlixir - Premium African Herbal Tea from Cameroon',
    description: 'Discover authentic Cameroonian herbal tea blends. 100% natural, organic wellness teas. Proudly made in Cameroon, loved worldwide.',
    url: 'https://earthlixir.net',
    siteName: 'Earthlixir',
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Earthlixir - Premium Cameroonian Tea',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earthlixir - Premium African Herbal Tea',
    description: 'Discover authentic Cameroonian herbal tea blends. 100% natural, organic wellness teas.',
    images: ['/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#16a34a', // Green color for iOS
};

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: 'swap',
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${dancingScript.variable} ${openSans.variable}`}>
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}