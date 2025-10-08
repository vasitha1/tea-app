import { Inter, JetBrains_Mono, Dancing_Script, Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'Earthlixir - Premium Cameroonian Tea',
  description: 'Discover authentic Cameroonian tea blends crafted with traditional wisdom and modern wellness benefits.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#16a34a',
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