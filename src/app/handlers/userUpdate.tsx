async function userUpdateHandler(data: {
  name: string;
  family: string;
  user_desc: string;
  user_gender: string;
  image: File;
}) {
  
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("family", data.family);
  formData.append("user_desc", data.user_desc);
  formData.append("user_gender", data.user_gender);
  formData.append("image", data.image);

  const req = await fetch("/api/updateuser", {
    method: "POST",
    body: formData,
  });
}

export default userUpdateHandler;
