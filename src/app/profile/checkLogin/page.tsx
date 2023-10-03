"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CookieSetter from "@/app/components/cookieSetter/cookieSetter";

function CheckLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      checkLog();
    }
  }, [session]);

  const checkLog = async () => {
    try {
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

      ///Adding to Cookie
      
      CookieSetter({
        name: data.user.name,
        family: "",
        userId: data.user.id,
        age: 0,
        location: "",
        token: data?.token,
      });

      ///Adding to Cookie

    //   if (data.new_user) {
    //     router.push("/profile/edit-profile");
    //   } else {
    //     router.push("/profile/explore");
    //   }
    } catch (error) {
      // Handle error as needed
    }
    return <></>;
  };
}

export default CheckLogin;
