import { cookies } from 'next/headers'
import { signOut } from 'next-auth/react';

export function SignOut() {
    cookies().delete('w-user');
    // signOut({callbackUrl:'/login'})
}

