export async function updateHandler(data: {
  name: string;
  family: string;
  user_desc: string;
  user_gender: string;
  image: File;
  birth_date: string;
}) {

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("family", data.family);
  formData.append("user_desc", data.user_desc);
  formData.append("user_gender", data.user_gender);
  formData.append("user_birthday",data.birth_date);
  if (data.image) {
    formData.append("image", data.image);
  }
console.log('rezasa',formData.get('birth_date'))
  const req = await fetch("/api/updateuser", {
    method: "POST",
    body: formData,
  });
}
