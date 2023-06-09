import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, Client, Databases } from "appwrite";

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
  client: new Client(),
  account: new Account(new Client()),
  databases: new Databases(new Client()),
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAppwrite = () => useContext(AppwriteContext);

export const AppwriteProvider: React.FC<AppwriteProviderProps> = ({
  children,
}) => {
  const [client] = useState(
    new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string),
  );
  const [account] = useState(new Account(client));
  const [databases] = useState(new Databases(client));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if session token exists in cookie or local storage
    const sessionToken =
      localStorage.getItem("sessionToken") ||
      document.cookie.replace(
        /(?:(?:^|.*;\s*)sessionToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
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
      localStorage.removeItem("sessionToken");
    }
  };

  return (
    <AppwriteContext.Provider
      value={{ client, account, databases, isLoggedIn, setLoggedIn }}>
      {children}
    </AppwriteContext.Provider>
  );
};
