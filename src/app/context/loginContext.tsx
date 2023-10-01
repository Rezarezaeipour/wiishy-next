'use client'
import { createContext,ReactNode, useContext } from "react";

const LoginContext = createContext<any>(null);

 const LoginProvider = ({ children }: { children: ReactNode }) => {
    const name = "REZA";
    const checkIsNew = async () => {
            const res = await fetch('/api/loginApi');
            const  data = await res.json();
            console.log(data);
    } 

    return (
        <LoginContext.Provider value={{checkIsNew,name}}>
            {children}
        </LoginContext.Provider>
    )
}
const useLoginContext = () => {
    return useContext(LoginContext)
}
export {useLoginContext, LoginProvider};

