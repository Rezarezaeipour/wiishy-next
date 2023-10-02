
export async function POST(req: { json: () => PromiseLike<{ name: any; email: any; provider: any; }> | { name: any; email: any; provider: any; }; }) {

  const { name, email, provider } = await req.json();
  const response = await fetch(`http://wiishy-backend.ir/api/auth/${provider}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
    }),
  });

  // if (!response.ok) {
  //   throw new Error('Failed to fetch data');
  // }

  const data = await response.json();
  return Response.json(data)

}
