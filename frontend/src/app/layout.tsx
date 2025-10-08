'use client';
import { Inter, JetBrains_Mono, Dancing_Script, Open_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Providers } from './providers';

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
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${dancingScript.variable} ${openSans.variable}`}>
      <body className="antialiased">
        <Providers>
          {isAdminRoute ? (
            // Admin routes: no header/footer
            <>{children}</>
          ) : (
            // Public routes: with header/footer
            <div className="flex flex-col min-h-screen">
              <Header />
              
              <main className="flex-grow">
                {children}
              </main>
              
              <Footer />
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}