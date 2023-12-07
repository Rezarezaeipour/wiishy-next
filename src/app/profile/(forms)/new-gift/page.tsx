"use client";
import { Button, DotLoading, Dropdown, Form, Slider, Toast } from "antd-mobile";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { SliderValue } from "antd-mobile/es/components/slider";
import { addHandler } from "@/app/api-client/gifts";
import wiishy from "./../../../../../public/logo/wiishy-gray.jpg";

import { AddCircleOutline } from "antd-mobile-icons";
import { useRouter } from "next/navigation";
import { HeartOutlined } from "@ant-design/icons";
import { chatting } from "@/app/api-client/ai";
import { Select } from "antd";

function NewGift() {
  const { register, handleSubmit, setValue, reset } = useForm();

  const [file, setFile] = useState<File>();
  const [image, setImage] = useState(wiishy.src);
  const [desire, setDesire] = useState<SliderValue>(50);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState("");
  const [aiload, setAiload] = useState(false);
  const [priceunit, setPriceunit] = useState<string>("1");

  const router = useRouter();
  const urlRef = useRef<any>();
  const priceunitRef = useRef<any>();
  const imageRef = useRef<any>();

  // Temp ChatGpt API
  const getUrl = async (url: string) => {
    url.length > 0
      ? (async () => {
          setAiload(true);
          //       const prompt = `I'll give you a link of an e-commerce wesite. Please give me the name, price, price unit and the main image address of the product in this
          // page in a object with JSON format with these keys: name, price, price_unit, image_url
          // here is the link : ${url}. something like this : {product: { name: '', price : 00, price_unit:'',image_url:''}} .
          //  please dont add anyhting else, return just an json structure without json word.
          //  `;
          const prompt = `I'll give you a link of an e-commerce wesite. Please give me the name, price, price unit and the main image address of the product 
           in a object with JSON format with these keys: name, price, price_unit, image_url. something like this : {product: { name: '', price : 00, price_unit:'',image_url:''}} .
           please dont add anyhting else, return just an json structure without json word. 
      for example, in this link:"https://www.digikala.com/product/dkp-8182784/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D9%86%D9%88%DA%A9%DB%8C%D8%A7-%D9%85%D8%AF%D9%84-g21-ta-1418-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-6-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA/" the result is like this : 
      { "product": { "name": "گوشی موبایل نوکیا مدل G21 TA-1418 دو سیم کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت", "price": "۴,۷۴۹,۰۰۰", "price_unit": "تومان", "image_url": "https://dkstatics-public.digikala.com/digikala-products/220320651.jpg" } } and in this link : "https://www.digikala.com/product/dkp-11281765/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B4%DB%8C%D8%A7%D8%A6%D9%88%D9%85%DB%8C-%D9%85%D8%AF%D9%84-redmi-note-12-4g-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-4-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%DA%AF%D9%84%D9%88%D8%A8%D8%A7%D9%84-clone-1-of-11205904/" the result should be :
      json creator
      { "product": { "name": "گوشی موبایل شیائومی مدل Redmi Note 12 4G دو سیم کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت - گلوبال", "price": "۶,۳۹۹,۰۰۰", "price_unit": "تومان", "image_url": "https://dkstatics-public.digikala.com/digikala-products/348e17f0fe855cb25127298fd5003460b3d29297_1683533217.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90" } }
      here is the link : ${url}
     `;

          const response = await chatting(prompt);
          const resObj = await JSON.parse(response);
          const product = resObj.product;

          console.log("product", product);

          setValue("giftname", product.name);
          setValue("giftprice", product.price);

          const price_unit = product.price_unit;
          //  imageRef.current.value = product.price_unit;
          setAiload(false);
        })()
      : (() => {
          Toast.show({
            content: "Add a product link",
            position: "bottom",
          });
        })();
  };

  /// Handle Submit
  const onSubmit = async (data: any) => {
    if (file) {
      setLoading(true);
      const response = await addHandler({
        ...data,
        desire_rate: desire,
        gift_unit_price : priceunit,
        image: file,
      });
      if (response) {
        setLoading(false);
        Toast.show({
          content: response,
          position: "bottom",
        });
        (() => {
          setTimeout(() => {
            router.push("/profile/my-profile");
          }, 1000);
        })();
      }
    } else {
      Toast.show({
        content: "You should add an image",
        position: "bottom",
      });
      // (() => {
      //   setTimeout(() => {
      //     router.push("/profile/my-profile");
      //   }, 1000);
      // })();
    }
  };
  /// End Handle Submit

  const marks = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };

  return (
    <>
      <div className="p-3 pb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center pt-5 ">
            <Image
              src={image}
              width={300}
              height={250}
              alt="wiishy user"
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="flex justify-center py-8 relative">
            <AddCircleOutline
              className="uploaGiftBtn"
              onClick={() =>
                document.getElementById("input-image-gift")?.click()
              }
            />
            <input
              type="file"
              name="file"
              id="input-image-gift"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
                e.target.files?.[0] &&
                  setImage(URL.createObjectURL(e.target.files?.[0]));
              }}
              style={{ display: "none" }}
            />
          </div>

          {/* GIFT URL */}
          <Form.Item
            label="Gift URL"
            className="font-extrabold text-3xl "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              autoComplete="off"
              placeholder="https://amazon.com/xxx"
              className="font-normal wiishy-input-text"
              {...register("gift_url")}
              ref={urlRef}
            />
          </Form.Item>
          {/* END URL */}
          <div>
            <div
              className="float-right"
              onClick={() => getUrl(urlRef.current.value)}
            >
              {aiload ? <DotLoading /> : <span>AI Fetch&nbsp;&gt;&gt;</span>}
            </div>
            <div className="clear-both"></div>
          </div>
          {/* GIFT NAME */}
          {fetched}

          <Form.Item
            label="Gift name"
            className="font-extrabold text-3xl "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              autoComplete="off"
              placeholder="Electric bicycle"
              className="font-normal wiishy-input-text"
              {...register("giftname", { required: true, maxLength: 200 })}
            />
          </Form.Item>

          {/* END GIFT NAME */}

          {/* GIFT PRICE */}
          <Form.Item
            label="Gift Price (in USD)"
            style={{ backgroundColor: "transparent" }}
          ></Form.Item>
          {/* END GIFT PRICE */}

          <div className="flex">
            <input
              autoComplete="off"
              type="number"
              placeholder="250"
              className="font-normal  wiishy-input-text py-3 basis-3/4"
              style={{ height:"45px", borderRight: "none", borderRadius: "5px 0px 0px 5px" }}
              {...register("giftprice", { required: true })}
            />
            <Select
              labelInValue
              defaultValue={{ value: `${priceunit}`}}
              // value={{ value: "4", label: "IRR" }}
              style={{
                  border: "solid thin silver",
                  borderRadius: "0px 5px 5px 0px",
                  height: "45px",
              }}
              className="basis-1/4"
              onChange={(v)=>setPriceunit(v.value)}
              options={[
                {
                  value: "1",
                  label: "$",
                },
                {
                  value: "2",
                  label: "€",
                },
                {
                  value: "3",
                  label: "£",
                },
                {
                  value: "4",
                  label: "IRR",
                },
              ]}
            />
            {/* <Dropdown
              className=" "
              style={{
                border: "solid thin silver",
                borderRadius: "0px 5px 5px 0px",
                height: "45px",
              }}
              closeOnMaskClick={true}
            >
              <Dropdown.Item key="sorter" title="Unit">
                <div style={{ padding: 12 }}>
                  <p onClick={() => setPriceunit(1)}>$</p>
                  <br />
                  <p onClick={() => setPriceunit(2)}>€</p>
                  <br />
                  <p onClick={() => setPriceunit(3)}>£</p>
                  <br />
                  <p onClick={() => setPriceunit(4)}>IRR</p>
                </div>
              </Dropdown.Item>
            </Dropdown> */}
          </div>

          {/* GIFT DESIRE */}
          <Form.Item
            label="How much do you love it?"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="my-4">
              <Slider
                marks={marks}
                ticks
                onAfterChange={(value) => setDesire(value)}
                defaultValue={3}
                max={5}
                icon={
                  <HeartOutlined className="mx-auto flex justify-center items-center h-full w-full text-[15px]" />
                }
              />
            </div>
          </Form.Item>
          {/* Endi GIFT DESIRE */}
          {/* GIFT DESCRIPTION */}
          <Form.Item
            label="Gift description"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            <textarea
              autoComplete="false"
              placeholder="Write atleast three lines about the gift"
              maxLength={100}
              rows={3}
              className="font-normal wiishy-input-text"
              {...register("giftdescription")}
            />
          </Form.Item>
          {/* END GIFT DESCRIPTION */}

          {/* SUBMIT BUTTON */}

          <div className="pb-5 px-2 mt-1 fixed bottom-0 left-0 w-full z-10">
            <Button
              loading={loading}
              type="submit"
              className="btn btn-regular btn-big-style w-full m-1"
              style={{ fontSize: "14px" }}
            >
              Save
            </Button>

            {/* END SUBMIT BUTTON */}
          </div>
        </form>
      </div>
    </>
  );
}

export default NewGift;
