
export async function addHandler(data: any) {
    const formData = new FormData();
  
    formData.append("gift_name", data.giftname),
      formData.append("gift_price", data.giftprice),
      formData.append("gift_desc", data.giftdescription),
      formData.append("gift_url", data.gift_url),
      formData.append("gift_image_url", "http://djkjd.com"),
      formData.append("desire_rate", data.desire_rate);
  
    const req = await fetch("/api/addnewgift", {
      method: "POST",
      body: formData,
    });
  }

  export async function myProductListHandler() {
   
    const list = await fetch('/api/getmygifts',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })

    return await list.json();
}
  
  