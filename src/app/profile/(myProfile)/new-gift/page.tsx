"use client";
import { Button, DatePicker, Form, Selector, Slider, Toast } from "antd-mobile";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { SliderValue } from "antd-mobile/es/components/slider";
import { addHandler } from "@/app/api-client/gifts";
import wisshy from "../../../../../public/wisshy.png";
import { AddCircleOutline } from "antd-mobile-icons";

function NewGift() {
  const { register, handleSubmit,reset } = useForm();

  const [file, setFile] = useState<File>();
  const [image, setImage] = useState(wisshy.src);
  const [desire, setDesire] = useState<SliderValue>(50);
  const [loading, setLoading] = useState(false);
  const now = new Date();

  /// Handle Submit
  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await addHandler({
      ...data,
      desire_rate: desire,
      image: file,
    });
    if (response) {
      setLoading(false);
      Toast.show({
        content: response,
        position: "bottom",
      });
      reset();
      setImage(wisshy.src);
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
                height: "250px",
                objectFit: "cover",
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
              placeholder="https://amazon.com/xxx"
              className="font-normal wiishy-input-text"
              {...register("gift_url")}
            />
          </Form.Item>
          {/* END URL */}

          {/* GIFT NAME */}
          <Form.Item
            label="Gift name"
            className="font-extrabold text-3xl "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Electric bicycle"
              className="font-normal wiishy-input-text"
              {...register("giftname")}
            />
          </Form.Item>

          {/* END GIFT NAME */}

          {/* GIFT PRICE */}
          <Form.Item
            label="Gift Price (in USD)"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            <input
              type="number"
              placeholder="250"
              className="font-normal  wiishy-input-text"
              {...register("giftprice")}
            />
          </Form.Item>
          {/* END GIFT PRICE */}

          {/* GIFT DESIRE */}
          <Form.Item
            label="Gift desire"
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
              />
            </div>
          </Form.Item>
          {/* Endi GIFT DESIRE */}
          {/* GIFT DESCRIPTION */}
          <Form.Item
            label="Gift description"
            help="Let others know about this product"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            <textarea
              placeholder="Write atleast three lines about the gift"
              maxLength={100}
              rows={5}
              className="font-normal wiishy-input-text"
              {...register("giftdescription")}
            />
          </Form.Item>
          {/* END GIFT DESCRIPTION */}

          {/* SUBMIT BUTTON */}
          <div className="pb-5 px-0 mt-1 ">
            <Button
              loading={loading}
              type="submit"
              className="btn btn-regular w-full m-1"
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
