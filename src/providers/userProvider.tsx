import { ID , type Models} from 'appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../../lib/appwrite';
import { isLoggedInAtom } from 'src/atoms/user';
import { useSetAtom } from 'jotai';

type UserContextType = {
  current: Models.Session | Models.Preferences | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null)

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Models.Session | Models.Preferences | null>(null)
    const setIsLoggedIn = useSetAtom(isLoggedInAtom)
    async function login(email:string, password:string){
        const loggedIn = await account.createEmailSession(email, password)
        if (loggedIn) {
            setUser(loggedIn)
            setIsLoggedIn(true)
        }
    }

    async function logout() {
        await account.deleteSession('current')
        setUser(null)
        setIsLoggedIn(false)
    }

    async function register(email:string, password:string) {

        await account.create(ID.unique(), email, password)
        await login(email, password)
    }



    return (
        <UserContext.Provider value={{ current: user, login, logout, register}}>
            {children}
        </UserContext.Provider>
    )
}