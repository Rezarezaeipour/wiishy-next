export  async function chatting() {

  try {
    const prompt = "scan the below text and extract product title, description, price and image in a json format: <meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"layout\" content=\"main\"><meta name=\"referrer\" content=\"unsafe-url\"><meta property=\"og:title\" content=\"Apple iPhone 13 A2482 128GB Network Unlocked Good Condition | eBay\"><meta name=\"msvalidate.01\" content=\"34E98E6F27109BE1A9DCF19658EEEE33\"><meta property=\"og:description\" content=\"Apple iPhone 13 A2482 128GB Network Unlocked Good Condition from DirectAuth. All our Devices are tested and inspected in an ISO9001 facility. Our testing includes (but is not limited to) Yes, we test all our devices for battery health.\"><meta property=\"og:type\" content=\"ebay-objects:item\"><meta name=\"google-site-verification\" content=\"8kHr3jd3Z43q1ovwo0KVgo_NZKIEMjthBxti8m8fYTg\"><meta http-equiv=\"content-language\" content=\"en-US\"><meta property=\"og:site_name\" content=\"eBay\"><meta name=\"yandex-verification\" content=\"6e11485a66d91eff\"><meta name=\"y_key\" content=\"acf32e2a69cbc2b0\"><meta property=\"fb:app_id\" content=\"102628213125203\"><title>Apple iPhone 13 A2482 128GB Network Unlocked Good Condition | eBay</title><meta name=\"description\" content=\"Apple iPhone 13 A2482 128GB Network Unlocked Good Condition from DirectAuth. All our Devices are tested and inspected in an ISO9001 facility. Our testing includes (but is not limited to) Yes, we test all our devices for battery health.\"><meta property=\"og:image\" content=\"https://i.ebayimg.com/images/g/DDcAAOSwEjhjcrCI/s-l400.jpg\"><meta name=\"twitter:card\" content=\"summary\"><meta name=\"twitter:description\" content=\"Apple iPhone 13 A2482 128GB Network Unlocked Good Condition from DirectAuth. All our Devices are tested and inspected in an ISO9001 facility. Our testing includes (but is not limited to) Yes, we test all our devices for battery health.\"><meta property=\"og:url\" content=\"https://www.ebay.com/itm/354393355064\"><meta name=\"twitter:title\" content=\"Apple iPhone 13 A2482 128GB Network Unlocked Good Condition\"><meta name=\"twitter:image\" content=\"https://i.ebayimg.com/images/g/DDcAAOSwEjhjcrCI/s-l400.jpg\"><!-- NGMARS SIGNATURE -->\n ";
    const response = await fetch("/api/gptengine", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    console.log(error)
  }

}
