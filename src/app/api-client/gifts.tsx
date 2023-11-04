

export async function addHandler(data: any) {
  const formData = new FormData();

  formData.append("gift_name", data.giftname),
    formData.append("gift_price", data.giftprice),
    formData.append("gift_desc", data.giftdescription),
    formData.append("gift_url", data.gift_url),
    formData.append("gift_image_url", "http://djkjd.com"),
    formData.append("desire_rate", data.desire_rate);
  formData.append("image", data.image);

  const req = await fetch("/api/addnewgift", {
    method: "POST",
    body: formData,
  });

  const response = await req.json();
  return response;
}

export async function updateHandler(data: any) {
  const formData = new FormData();

  formData.append("gift_name", data.giftname),
    formData.append("gift_price", data.giftprice),
    formData.append("gift_desc", data.giftdescription),
    formData.append("gift_url", data.gift_url),
    formData.append("gift_image_url", data.gift_url),
    formData.append("desire_rate", data.desire_rate);
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

export async function loadGiftHandler(giftid: number) {
  const res = await fetch("/api/loadgift", {
    method: "POST",
    body: JSON.stringify(`{"giftid" : ${giftid}}`),
  });

  return await res.json();
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
    if (res.ok){
      return await res.json(); 
    }
  
}

export async function explore() {

  const res = await fetch("/api/explore", {
    method: "GET",
  });
  if (res.ok){
    return await res.json(); 
  }

}
