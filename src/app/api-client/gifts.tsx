import { format } from "path";

export async function addHandler(data: any) {
  const formData = new FormData();

  formData.append("gift_name", data.giftname),
    formData.append("gift_price", data.giftprice),
    formData.append("gift_desc", data.giftdescription),
    formData.append("gift_url", data.gift_url),
    formData.append("desire_rate", data.desire_rate);
  formData.append("gift_image_url", data.gift_image_url);
  formData.append("price_unit_id", data.gift_unit_price);
  formData.append("my_product", data.isproduct);
  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await fetch("/api/addnewgift", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const response = await res.json();
    return response;
  }

  return "Something went wrong";
}

export async function updateHandler(data: any) {
  const formData = new FormData();

  formData.append("gift_name", data.giftname),
    formData.append("gift_price", data.giftprice),
    formData.append("gift_desc", data.giftdescription),
    formData.append("gift_url", data.gift_url),
    formData.append("gift_image_url", data.gift_url),
    formData.append("desire_rate", data.desire_rate);
  formData.append("price_unit_id", data.gift_unit_price);
  formData.append("gift_id", data.giftid);
  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await fetch("/api/updategift", {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const response = await res.json();
    return response;
  }
  return "Something went wrong";
}

export async function myProductListHandler() {
  const list = await fetch("/api/getmygifts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await list.json();
}

export async function myProducedProduct() {
  const list = await fetch("/api/getmyproducedproduct", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await list.json();
}

export async function myWishesProduct() {
  const list = await fetch("/api/getmywishgifts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await list.json();
}

export async function productListHandler(userId: number) {
  const list = await fetch("/api/getusergifts", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  if (list.ok) {
    return await list.json();
  } else {
    return { message: "something went wrong" };
  }
}

export async function loadGiftHandler(giftid: number) {
  const res = await fetch("/api/loadgift", {
    method: "POST",
    body: JSON.stringify(`{"giftid" : ${giftid}}`),
  });
  if (res.ok) {
    return await res.json();
  } else {
    return { message: "There is a problem" };
  }
}

export async function deleteGift(giftid: number) {
  const res = await fetch("/api/deletegift", {
    method: "POST",
    body: JSON.stringify(`{"giftid" : ${giftid}}`),
  });
  return await res.json();
}

export async function loadMyFollowingProductlist() {
  const res = await fetch("/api/loadmyfollowinggifts", {
    method: "GET",
  });
  if (res.ok) {
    return await res.json();
  }
}

export async function explore() {
  const res = await fetch("/api/explore", {
    method: "GET",
  });
  if (res.ok) {
    return await res.json();
  }
}

export async function home() {
  const res = await fetch("/api/home", {
    method: "GET",
  });
  if (res.ok) {
    return await res.json();
  }
}

export async function unLikeGift(giftid: number) {
  const res = await fetch("/api/unlike", {
    method: "POST",
    body: JSON.stringify({ giftid }),
  });
}

export async function likeGift(giftid: number) {
  const res = await fetch("/api/like", {
    method: "POST",
    body: JSON.stringify({ giftid }),
  });
  if (res.ok) {
    const response = await res.json();
  }
}

export async function getGiftIdea(genderid: number, age: number) {
  try {
    let gender = "";
    switch (genderid.toString()) {
      case "1":
        gender = "Man";
        break;
      case "2":
        gender = "Woman";
        break;
      case "3":
        gender = "Unisex";
        break;
    }

    const prompt = [
      `Give me 10 gift ideas in a simple object of strings for a ${age} years old ${gender}. sample: {giftIdeas : ['idea1','idea2']}`,
    ];
    const response = await fetch("/api/gptengine", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    console.log(error);
    return error;
  }
}
