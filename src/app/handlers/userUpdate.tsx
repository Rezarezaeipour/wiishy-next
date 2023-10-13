function userUpdateHandler(data: {
  name: string;
  family: string;
  bio: string;
}) {
  console.log('userUpdateFunction',data);
  const req = fetch("/api/updateuser", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return <></>;
}

export default userUpdateHandler;
