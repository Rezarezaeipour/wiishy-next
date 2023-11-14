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
  formData.append("user_birthday", data.birth_date);
  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await fetch("/api/updateuser", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    return await res.json();
  } else {
    return { message : "something went wrong" };
  }
}

export default async function getUserData(userId: number) {
  let data;
  const res = await fetch("/api/loaduser", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  if (res.ok) {
    data = await res.json();
  } else {
    data = { message: "Something went wrong" };
  }

  return data;
}

export async function getMyData(userId: number) {
  let data;
  const res = await fetch("/api/getuserdata", {
    method: "GET",
  });

  if (res.ok) {
    data = await res.json();
  } else {
    data = { message: "Something went wrong" };
  }

  return data;
}

export async function amIfollowHim(userId: number) {
  let data;
  const res = await fetch("/api/amifollowhim", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  if (res.ok) {
    data = await res.json();
  } else {
    data = { message: "Something went wrong" };
  }

  return await data;
}

export async function followUser(userId: number) {
  let data;
  const res = await fetch("/api/followuser", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  if (res.ok) {
    data = await res.json();
  } else {
    data = { message: "Something went wrong" };
  }

  return await data;
}

export async function unFollowUser(userId: number) {
  let data;
  const res = await fetch("/api/unfollowuser", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  if (res.ok) {
    data = await res.json();
  } else {
    data = { message: "Something went wrong" };
  }

  return await data;
}


export async function getFollowings(userId: number) {
  const res = await fetch("/api/getfollowings", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  if (res.ok) {
    return await res.json();
  }else{
    return  "{'message':'Something went wrong'}";
  }

}

export async function getFollowers(userId: number) {
  const res = await fetch("/api/getfollowers", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  if (res.ok) {
    return await res.json();
  }else{
    return  "{'message':'Something went wrong'}";
  }
}