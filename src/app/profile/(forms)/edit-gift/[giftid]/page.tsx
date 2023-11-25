"use client";
import {
  Button,
  DatePicker,
  Dialog,
  Form,
  Selector,
  Slider,
  Toast,
} from "antd-mobile";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { SliderValue } from "antd-mobile/es/components/slider";
import {
  loadGiftHandler,
  updateHandler,
  deleteGift,
} from "@/app/api-client/gifts";

import { AddCircleOutline } from "antd-mobile-icons";
import { useRouter } from "next/navigation";
import { Skeleton } from "antd";


function EditGift({ params }: { params: { giftid: string } }) {
  
  const { register, handleSubmit, reset, setValue } = useForm();
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState("");
  const [desire, setDesire] = useState<SliderValue>(5);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const now = new Date();
  const [loaded, setLoaded] = useState(false);

  /// Handle Load Gift

  useEffect(() => {
    (async () => {
      const data = await loadGiftHandler(Number.parseInt(params.giftid));
      const loadedGift = data.gift_detail[0];

      data
        ? (() => {
            setValue("gift_url", loadedGift.gift_url);
            setValue("giftname", loadedGift.gift_name);
            setValue("giftprice", loadedGift.gift_price);
            setValue("giftdescription", loadedGift.gift_desc);
            setDesire(loadedGift.desire_rate);
            setImage("https://wiishy-backend.ir/" + loadedGift.gift_image_url);
            setLoaded(true);
          })()
        : (() => {
            Toast.show({
              content: "There is a problem in loading your data",
              position: "bottom",
            });
          })();
    })();
  }, [setValue, params.giftid]);

  /// End Handle Load Gift

  /// Handle Submit
  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await updateHandler({
      ...data,
      desire_rate: desire,
      image: file,
      giftid: params.giftid,
    });
    if (response) {
      setLoading(false);
      Toast.show({
        content: response.message,
        position: "bottom",
      }); 
      (() => {
        setTimeout(() => {
          router.push("/profile/my-profile");
        }, 1000);
      })();
    }
  };
  /// End Handle Submit

  /// Handle Delete
  const deleteHandler = async () => {
    const deleteRes = await deleteGift(Number.parseInt(params.giftid));

    Toast.show({
      content: deleteRes.message,
      position: "bottom",
    });
    (() => {
      setTimeout(() => {
        router.push("/profile/my-profile");
      }, 1000);
    })();
  };
  /// End Handle Delete

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
          {loaded ? (
            <>
              <div className="flex justify-center pt-5 w-full">
                <Image
                  src={image}
                  width={300}
                  height={250}
                  alt="wiishy user"
                  style={{
                    width: "100%",
                    height: "350px",
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
                    defaultValue={desire}
                    value={desire}
                    max={5}
                  />
                </div>
              </Form.Item>
              {/* End GIFT DESIRE */}

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
              {/* <div className="pb-5 px-2 mt-1 fixed bottom-0 left-0 w-full z-10"> */}
              <div className="flex flex-row pb-5 px-2 mt-1 fixed bottom-0 left-0 w-full z-10">
                <Button
                  loading={loading}
                  type="submit"
                  className="btn btn-regular btn-big-style w-full m-1 basis-3/4"
                  style={{ fontSize: "14px" }}
                >
                  Save
                </Button>
                <Button
                  loading={loading}
                  type="button"
                  className="btn btn-regular-outline btn-big-style w-full m-1 basis-1/4"
                  style={{ fontSize: "14px" }}
                  onClick={async () => {
                    const result = await Dialog.confirm({
                      content: "Are you sure to delete this Gift?",
                      confirmText: "Yes",
                      cancelText: "No",
                      onConfirm: async () => {
                        deleteHandler();
                      },
                      onCancel: async () => {
                        Toast.show({
                          content: "Delete aborted",
                          position: "bottom",
                        });
                      },
                    });
                  }}
                >
                  Delete
                </Button>
                {/* END SUBMIT BUTTON */}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center pt-5 w-full mb-5">
                <Skeleton.Image
                  style={{ width: "100% !important", height: "200px" }}
                  className="w-full"
                />
              </div>
              <br/>
              <Skeleton paragraph={{ rows: 4 }} />
              <br />
              <Skeleton paragraph={{ rows: 4 }} />
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default EditGift;
