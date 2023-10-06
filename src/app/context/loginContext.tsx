"use client";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext } from "react";

const LoginContext = createContext<any>(null);

const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const checkIsNew = async () => {
    const res = await fetch("/api/loginApi");
    const data = await res.json();
    console.log(data);
  };

  const logIn = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session?.user?.name,
        email: session?.user?.email,
        provider: session?.user?.provider,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  };

  const logOut = async () => {
    const res = await fetch("/api/logout", {
      method: "HEAD",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <LoginContext.Provider value={{ checkIsNew, logIn, logOut }}>
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => {
  return useContext(LoginContext);
};

export { useLoginContext, LoginProvider };
