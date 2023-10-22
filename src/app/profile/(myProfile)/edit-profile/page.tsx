"use client";
import { Button, DatePicker, Form, Selector, Skeleton } from "antd-mobile";

import { Suspense, useEffect, useRef, useState } from "react";
import getLoadInfo from "../../../hooks/useLoadInfo";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { updateHandler } from "@/app/api-client/users";
import { AddCircleOutline } from "antd-mobile-icons";

function EditProfile() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gender, setGender] = useState("3");
  const [image, setImage] = useState("/wiishy.png");
  const [sbirth, setSbirth] = useState<string>("");
  const [datevisible, setDateVisible] = useState(false);
  const [file, setFile] = useState<File>();
  const now = new Date();
  const [birth, setbirth] = useState<Date>();
  const minDate = new Date(1960, 1, 1);

  useEffect(() => {
    (async () => {
      ///Load user info
      const data = await getLoadInfo();

      const bd = new Date(data?.user.user_birthday);
      setValue("name", data.user?.name);
      setValue("family", data.user?.family);
      setValue("user_desc", data.user?.user_desc);
      setGender(data.user?.user_gender);
      setImage(data.user?.user_image_url);
      setbirth(bd);

      ///End load user info
    })();
  }, [setValue, setGender, setbirth]);

  /// Handle Submit
  const onSubmit = (data: any) => {
    updateHandler({
      ...data,
      user_gender: gender,
      image: file,
      birth_date: sbirth,
    });
  };
  /// End Handle Submit

  return (
    <>
      <div className="p-3 pb-20">
        <Suspense fallback={<Skeleton.Paragraph lineCount={5} animated />}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center pt-5 relative">
              <Image
                src={image ? `https://wiishy-backend.ir${image}` : "./wiishy.png"}
                width={150}
                height={150}
                className="rounded-full"
                alt="wiishy user"
              />

              <AddCircleOutline
                className="uploaAvatarBtn"
                onClick={() =>
                  document.getElementById("input-image-avatar")?.click()
                }
              />
              <input
                type="file"
                name="file"
                id="input-image-avatar"
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
                {...register("name", { required: true, maxLength: 200 })}
              />
              <div style={{ clear: "both" }}></div>
              {errors.name?.type === "required" && (
                <p className="input-alert">Name is required</p>
              )}
            </Form.Item>

            {/* END NAME */}

            {/* FAMILY NANE */}
            <Form.Item
              label="Family"
              className="font-extrabold text-3xl"
              style={{ backgroundColor: "transparent" }}
            >
              <input
                placeholder="Your family name"
                className="font-normal  wiishy-input-text"
                {...register("family", { required: true, maxLength: 200 })}
              />
              <div style={{ clear: "both" }}></div>
              {errors.family?.type === "required" && (
                <p className="input-alert">Family is required</p>
              )}
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
                value={birth}
                defaultValue={now}
                min={minDate}
                max={now}
                cancelText="Cancel"
                confirmText="Add"
                title="Your birthday"
                onConfirm={(value) => {
                  setSbirth(
                    `${value?.getFullYear()}-${value?.getMonth()}-${value?.getDate()}`
                  );
                }}
              >
                {(value) => "  " + value?.toDateString()}
              </DatePicker>
            </Form.Item>
            {/* END BIRTH DATE */}

            {/* GENDER */}

            <Form.Item
              label="Gender"
              className="font-extrabold text-3xl"
              style={{ backgroundColor: "transparent" }}
            >
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
            </Form.Item>
            {/* END GENDER */}

            {/* BIO */}
            <Form.Item
              label="Bio"
              help="Let others know about you"
              className="font-extrabold text-3xl"
              style={{ backgroundColor: "transparent" }}
            >
              <textarea
                placeholder="Write atleast three lines about yourself"
                maxLength={300}
                rows={5}
                className="font-normal wiishy-input-text"
                {...register("user_desc", { required: true, maxLength: 300 })}
              />
              <div style={{ clear: "both" }}></div>
              {errors.user_desc?.type === "required" && (
                <p className="input-alert">Bio is required</p>
              )}
            </Form.Item>
            {/* END BIO */}
            <br />
            {/* SUBMIT BUTTON */}

            <div className="pb-5 px-0 mt-1 ">
              <Button
                type="submit"
                className="btn btn-regular w-full m-1"
                style={{ fontSize: "14px" }}
              >
                Save
              </Button>
            </div>

            {/* END SUBMIT BUTTON */}
          </form>
        </Suspense>
      </div>
    </>
  );
}

export default EditProfile;
