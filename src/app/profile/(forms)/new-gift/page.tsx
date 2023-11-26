"use client";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Selector,
  Slider,
  Toast,
} from "antd-mobile";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { SliderValue } from "antd-mobile/es/components/slider";
import { addHandler } from "@/app/api-client/gifts";
import wiishy from "./../../../../../public/logo/wiishy-gray.jpg";

import { AddCircleOutline } from "antd-mobile-icons";
import scrapp from "@/app/api-client/scrap";
import { useRouter } from "next/navigation";
import { HeartOutlined } from "@ant-design/icons";
import { chatting } from "@/app/api-client/ai";

function NewGift() {
  const { register, handleSubmit,setValue, reset } = useForm();

  const [file, setFile] = useState<File>();
  const [image, setImage] = useState(wiishy.src);
  const [desire, setDesire] = useState<SliderValue>(50);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState("");

  const router = useRouter();
  const urlRef = useRef<any>();
  const priceunitRef = useRef<any>();
  const imageRef = useRef<any>();

  // Temp ChatGpt API
  const getUrl = async (url: string) => {
    const prompt = `I'll give you a link of an e-commerce wesite. Please give me the name, price, price unit and the main image address of the product in this 
    page in a object with JSON format with these keys: name, price, price_unit, image_url
    here is the link : ${url}. something like this : {product: { name: '', price : 00, price_unit:'',image_url:''}} .
     please dont add anyhting else, return just an json structure without json word. 
     `;
   
    const response = await chatting(prompt);
    const resObj = await JSON.parse(response);
    const product = resObj.product;
   

   
    setValue("giftname",product.name);
    setValue("giftprice",product.price);
   
    const price_unit = product.price_unit;
    //  imageRef.current.value = product.price_unit;
  };

  /// Handle Submit
  const onSubmit = async (data: any) => {
    if (file) {
      setLoading(true);
      const response = await addHandler({
        ...data,
        desire_rate: desire,
        unit: 1,
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
             <span>AI Fetch&nbsp;&gt;&gt;</span> 
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
            className="font-extrabold text-3xl flex flex-row"
            style={{ backgroundColor: "transparent" }}
          >
            {/*   <input
              autoComplete="off"
              type="number"
              placeholder="250"
              className="font-normal  wiishy-input-text basis-3/4 "
              {...register("giftprice", { required: true })}
            /> 
          </Form.Item> */}
            <input
              autoComplete="off"
              type="number"
              placeholder="250"
              className="font-normal  wiishy-input-text py-3 basis-3/4"
              style={{ borderRight: "none", borderRadius: "5px 0px 0px 5px" }}
              {...register("giftprice", { required: true })}
              
            />
            {/* <Dropdown className="basis-1/4 " style={{border:"solid thin silver",borderRadius:"0px 5px 5px 0px"}}>
              <Dropdown.Item key="sorter" title="Unit">
                <div style={{ padding: 12 }}>
                  $
                  <br />
                  IRR
                </div>
              </Dropdown.Item>
            </Dropdown> */}
          </Form.Item>
          {/* END GIFT PRICE */}

          <div className="flex"></div>

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
