import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const cookie = cookies();
  const infoCookie = cookie.get('w-token');

  if (infoCookie?.value) {
    const infoCookieObject = JSON.parse(infoCookie.value);
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;

    try {
      const axiosResponse = await axios.post(
        `https://wiishy-backend.ir/api/user-update/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          
        }
      );

      const xdata = axiosResponse.data;
      const status = xdata.status;

      if (status === 'success') {
        return NextResponse.json({ message: xdata.message });
      } else {
        return NextResponse.json({ message: 'Something went wrong' });
      }
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ message: error });
    }
  }
}


