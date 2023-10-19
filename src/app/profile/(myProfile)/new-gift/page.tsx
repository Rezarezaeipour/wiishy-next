"use client";
import { Button, DatePicker, Form, Selector, Slider } from "antd-mobile";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import userUpdateHandler from "@/app/handlers/userUpdate";
import Image from "next/image";

function NewGift() {
  const { register, handleSubmit } = useForm();

  const [file, setFile] = useState<File>();
  const now = new Date();

  /// Handle Submit
  const onSubmit = (data: any) => {
    // userUpdateHandler({ ...data, user_gender: gender, image: file });
  };
  /// End Handle Submit

  const marks = {
    0: 0,
    20: 20,
    40: 40,
    60: 60,
    80: 80,
    100: 100,
  };

  return (
    <>
      <div className="p-3 pb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center pt-5">
            <Image
              src={"/wiisy.png"}
              width={150}
              height={150}
              className="rounded-full"
              alt="wiishy user"
            />
          </div>
          <div className="flex justify-center py-8">
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>

          {/* GIFT NAME */}
          <Form.Item
            label="Gift name"
            className="font-extrabold text-3xl "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Gift name"
              className="font-normal wiishy-input-text"
              {...register("giftname")}
            />
          </Form.Item>

          {/* END GIFT NAME */}

          {/* GIFT PRICE */}
          <Form.Item
            label="Gift Price"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Gift price in USD"
              className="font-normal  wiishy-input-text"
              {...register("giftprice")}
            />
          </Form.Item>
          {/* END GIFT PRICE */}
          <div className="my-4">
            <Slider marks={marks} ticks value={40}/>
          </div>
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
