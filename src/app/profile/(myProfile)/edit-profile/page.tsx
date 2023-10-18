"use client";
import {
  Button,
  DatePicker,
  Form,
  ImageUploadItem,
  Selector,
} from "antd-mobile";

import { useEffect, useRef, useState } from "react";
import getLoadInfo from "../../../hooks/useLoadInfo";
import { useForm, SubmitHandler } from "react-hook-form";
import userUpdateHandler from "@/app/handlers/userUpdate";
import Image from "next/image";

function EditProfile() {
  const { register, setValue, handleSubmit } = useForm();

  const [gender, setGender] = useState("3");
  const [image, setImage] = useState("/wiishy.png");
  const [datevisible, setDateVisible] = useState(false);
  const [file, setFile] = useState<File>();
  const now = new Date();

  useEffect(() => {
    (async () => {
      const data = await getLoadInfo();
      console.log("nnnmm", data);
      ///Load user info

      setValue("name", data.user?.name);
      setValue("family", data.user?.family);
      setValue("user_desc", data.user?.user_desc);
      setGender(data.user?.user_gender);
      setImage(data.user?.user_image_url);

      ///End load user info
    })();
  }, [setValue, setGender]);

  /// Handle Submit
  const onSubmit = (data: any) => {
    userUpdateHandler({ ...data, user_gender: gender, image: file });
  };
  /// End Handle Submit

  console.log("GENDER: ", gender);

  return (
    <>
      <div className="p-3 pb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center pt-5">
            <Image
              src={`https://wiishy-backend.ir${image}`}
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

          {/* NAME */}
          <Form.Item
            label="Name"
            className="font-extrabold text-3xl "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Your name"
              className="font-normal wiishy-input-text"
              {...register("name")}
            />
          </Form.Item>

          {/* END NAME */}

          {/* FAMILY NANE */}
          <Form.Item
            label="Family"
            name="Family"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Your family name"
              className="font-normal  wiishy-input-text"
              {...register("family")}
            />
          </Form.Item>
          {/* END FAMILY NAME */}

          {/* BIRTH DATE */}
          <Form.Item
            style={{ fontSize: "13px", backgroundColor: "transparent" }}
          >
            <Button
              className="btn-regular"
              style={{ fontSize: "14px" }}
              onClick={() => {
                setDateVisible(true);
              }}
            >
              Birth Date
            </Button>
            <DatePicker
              visible={datevisible}
              onClose={() => {
                setDateVisible(false);
              }}
              defaultValue={now}
              max={now}
              cancelText="Cancel"
              confirmText="Add"
              title="Your birthday"
            >
              {(value) => "  " + value?.toDateString()}
            </DatePicker>
          </Form.Item>
          {/* END BIRTH DATE */}

          {/* GENDER */}
          <Selector
            style={{
              "--border-radius": "100px",
              "--border": "solid transparent 1px",
              "--checked-border": "solid var(--adm-color-primary) 1px",
              "--padding": "8px 24px",
              fontSize: "13px",
              fontWeight: "normal",
            }}
            showCheckMark={false}
            options={[
              {
                label: "Man",
                value: "1",
              },
              {
                label: "Woman",
                value: "2",
              },
              {
                label: "Others",
                value: "3",
              },
            ]}
            value={[String(gender)]}
            defaultValue={[String(gender)]}
            onChange={(v) => {
              if (v.length) {
                setGender(v[0]);
                console.log(gender);
              }
            }}
          />
          <Form.Item
            label="Gender"
            name="Gender"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          ></Form.Item>
          {/* END GENDER */}

          {/* BIO */}
          <Form.Item
            name="address"
            label="Bio"
            help="Let others know about you"
            className="font-extrabold text-3xl"
            style={{ backgroundColor: "transparent" }}
          >
            <textarea
              placeholder="Write atleast three lines about yourself"
              maxLength={100}
              rows={5}
              className="font-normal wiishy-input-text"
              {...register("user_desc")}
            />
          </Form.Item>
          {/* END BIO */}

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

export default EditProfile;
