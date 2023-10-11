import { cookies } from 'next/headers'

export async function HEAD(_req: any) {
  
  cookies().delete('w-user');
  cookies().set('w-user', '');

  cookies().delete('w-token');
  cookies().set('w-token', '');

}
