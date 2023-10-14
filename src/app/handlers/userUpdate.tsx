function userUpdateHandler(data: {
  name: string;
  family: string;
  user_desc: string;
  image: File,
  user_gender:string

}) {
  
  console.log('userUpdate',data)
  const dt = new FormData();
  dt.set('file',JSON.stringify(data))
  const req = fetch("/api/updateuser", {
    method: "PUT",
    body: dt,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default userUpdateHandler;
