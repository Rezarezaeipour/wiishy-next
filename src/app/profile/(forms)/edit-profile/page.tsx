"use client";
import {
  Button,
  DatePicker,
  Form,
  Selector,
  TextArea,
  Toast,
} from "antd-mobile";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { getMyData, updateHandler } from "@/app/api-client/users";
import { AddCircleOutline } from "antd-mobile-icons";
import wisshy from "../../../../../public/default-avatar.png";
import { useRouter } from "next/navigation";
import { url } from "inspector";

function EditProfile() {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gender, setGender] = useState("3");
  const [image, setImage] = useState(wisshy.src);
  const [sbirth, setSbirth] = useState<string>("");
  const [datevisible, setDateVisible] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const now = new Date();
  const [birth, setbirth] = useState<Date>();
  const minDate = new Date(1950, 1, 1);
  const [status, setStatuse] = useState(false);
  const router = useRouter();

  /// Handle Load
  useEffect(() => {
    (async () => {
      ///Load user info
      const data = await getMyData(0);
    
      data
        ? (() => {
           
            data ? setStatuse(true) : setStatuse(false);
            const bd = data?.users.user_birthday ? new Date(data?.users.user_birthday) : new Date() ;
            setValue("name", data.users?.name);
            setValue("family", data.users?.family);
            setValue("user_desc", data.users?.user_desc);
            setGender(data.users?.user_gender);
            setImage("https://wiishy-backend.ir" + data.users?.user_image_url);
            setbirth(bd);
            setSbirth(
              `${bd?.getFullYear()}-${
                bd?.getMonth() + 1
              }-${bd?.getDate()}`
            );
          })()
        : (() => {
            Toast.show({
              content: "There is a problem in loading your data",
              position: "bottom",
            });
          })();

      ///End load user info
    })();
  }, [setValue, setGender, setbirth]);
  // End handle load

  async function updateProfile(data: any) {
   
    setLoading(true);
    const response = await updateHandler({
      ...data,
      user_gender: gender,
      image: file,
      birth_date: sbirth,
    });

    if (response) {
      setLoading(false);
      Toast.show({
        content: response.message,
        position: "bottom",
      });
    }
    (() => {
      setTimeout(() => {
        router.push("/profile/my-profile");
      }, 1000);
    })();
   
  }

  /// Handle Submit
  const onSubmit = async (data: any) => {
    gender
      ? (sbirth  ? updateProfile(data) : Toast.show({
        content: "Please add your birth date",
        position: "bottom",
      }))
      : Toast.show({
          content: "Please add your gender",
          position: "bottom",
        });
  };
  /// End Handle Submit

  return (
    <>
      <div className="p-3 pb-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center pt-5 relative">
            <div className="min-h-[150px]">
              {!status ? (
                <Skeleton.Avatar active={true} size={150} shape={"circle"} />
              ) : (
                <>
                  <Image
                    src={image}
                    width={150}
                    height={150}
                    className="rounded-full"
                    alt="wiishy user"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      border: "solid 2px white",
                    }}
                  />
                  <AddCircleOutline
                    className="uploaAvatarBtn"
                    onClick={() =>
                      document.getElementById("input-image-avatar")?.click()
                    }
                  />
                </>
              )}
            </div>

            <input
              type="file"
              name="file"
              id="input-image-avatar"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
                e.target.files?.[0] &&
                  setImage(URL.createObjectURL(e.target.files?.[0]));
              }}
            />
          </div>

          {/* NAME */}
          <Form.Item
            label="Name"
            className="font-extrabold text-3xl "
            style={{ backgroundColor: "transparent" }}
          >
            
            <input
              autoComplete="off"
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
              autoComplete="off"
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
                setbirth(value);
                setSbirth(
                  `${value?.getFullYear()}-${
                    value?.getMonth() + 1
                  }-${value?.getDate()}`
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
                }
              }}
            />
          </Form.Item>
          {/* END GENDER */}

          {/* BIO */}
          <Form.Item
            label="Bio"
            help="Let others know about you"
            className="font-extrabold text-3xl mb-5"
            style={{ backgroundColor: "transparent" }}
          >
            <Controller
              name="user_desc"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  autoComplete="off"
                  placeholder="Write at least three lines about yourself"
                  maxLength={300}
                  rows={4}
                  showCount
                  className="font-normal wiishy-input-text bg-white"
                  {...field}
                />
              )}
            />

            <div style={{ clear: "both" }}></div>
            {errors.user_desc?.type === "required" && (
              <p className="input-alert">Bio is required</p>
            )}
          </Form.Item>
          {/* END BIO */}
          <br />
          {/* SUBMIT BUTTON */}

          <div className="pb-5 px-2 mt-1 fixed bottom-0 left-0 w-full">
            <Button
              loading={loading}
              type="submit"
              className="btn btn-regular btn-big-style w-full m-1"
              style={{ fontSize: "14px" }}
            >
              Save
            </Button>
          </div>

          {/* END SUBMIT BUTTON */}
        </form>
      </div>
    </>
  );
}

export default EditProfile;
