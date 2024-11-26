import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Account, type Client, type Databases } from 'appwrite';

import { account, client, databases } from '@/shared/lib/appwrite';

interface AppwriteProviderProps {
  children: React.ReactNode;
}
interface AppwriteContextType {
  client: Client;
  account: Account;
  databases: Databases;
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const AppwriteContext = createContext<AppwriteContextType>({
  client,
  account,
  databases,
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAppwrite = () => useContext(AppwriteContext);

export const AppwriteProvider: React.FC<AppwriteProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if session token exists in cookie or local storage
    const sessionToken =
      localStorage.getItem('sessionToken') ||
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
  const setLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      localStorage.removeItem('sessionToken');
      document.cookie = 'sessionToken=';
    }
  };

  return (
    <AppwriteContext.Provider
      value={{ client, account, databases, isLoggedIn, setLoggedIn }}
    >
      {children}
    </AppwriteContext.Provider>
  );
};
