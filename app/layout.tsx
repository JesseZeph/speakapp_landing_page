import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/components/Header";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speakapp - Discover a safe space to share your thought",
  description: "Speakapp is a mobile platform connecting users with certified therapists for mental wellness support. Book audio or chat-based therapy sessions, access community support, and find the right therapist for your needs.",
  keywords: ["mental health", "online therapy", "counseling", "therapist", "mental wellness", "therapy app", "mental health support", "online counseling", "therapist platform"],
  authors: [{ name: "SpeakApp Team" }],
  creator: "SpeakApp",
  publisher: "SpeakApp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://speakapp.ltd'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Speakapp - Discover a safe space to share your thought",
    description: "Book therapy sessions with certified professionals, access community support, and find mental wellness resources.",
    url: 'https://speakapp.ltd',
    siteName: 'Speakapp',
    images: [
      {
        url: '/seo.png',
        width: 1200,
        height: 630,
        alt: 'Speakapp - Mental Wellness Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Speakapp - Discover a safe space to share your thought",
    description: "Book therapy sessions with certified professionals, access community support, and find mental wellness resources.",
    images: ['/seo.png'],
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
  icons: {
    icon: '/favi.png',
    apple: '/favi.png',
  },
  verification: {
    google: 'google-site-verification=dAthuprHP_etht6oOGGjMhZapRudt37m0QuMaF2t8Wk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={clsx(nunito.variable, nunitoSans.variable)}>
        <Header />
        {children}
      </body>
    </html>
  );
}
