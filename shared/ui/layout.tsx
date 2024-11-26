// Importing the 'Inter' font from the 'next/font/google' library

// Importing an SVG logo file as a variable named 'reelLogo'
import React, { useEffect } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useAtom } from 'jotai';

import { isLoggedInAtom } from '@/entities/user/model/store';
import { client } from '@/shared/lib/appwrite';
import { useUser } from '../../app/providers/userProvider';
import Header from '../../widgets/header';

// Initializing the 'Inter' font object with a subset of "latin"
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const user = useUser();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  useEffect(() => {
    // Check if session token exists in cookie or local storage
    const sessionToken =
      localStorage.getItem('sessionToken') ??
      document.cookie.replace(
        /(?:(?:^|.*;\s*)sessionToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
    if (sessionToken) {
      // Set session using stored token
      client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string);
      client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);
      client.setJWT(sessionToken);
      setIsLoggedIn(true);
    }
  }, [client]);

  return (
    <>
      {/* The header meta tags */}
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        ></link>
        <link rel="icon" href="/images/favicon.ico" sizes="any"></link>
        <link rel="manifest" href="/images/site.webmanifest"></link>
        <title>ReelWatch</title>
      </Head>
      {/* The header section */}
      <Header user={user} isLoggedIn={isLoggedIn} />
      <div className={`${inter.variable} min-h-screen  mx-auto p-8`}>
        {/* The container for child components */}
        {children}
      </div>
    </>
  );
};

export default Layout;
