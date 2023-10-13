"use client";
import {
  Button,
  DatePicker,
  Form,
  ImageUploadItem,
  ImageUploader,
  Selector,
  TextArea,
} from "antd-mobile";

import { PictureOutline } from "antd-mobile-icons";
import { useEffect, useRef, useState } from "react";
import getLoadInfo from "../../../hooks/useLoadInfo";
import { useForm, SubmitHandler } from "react-hook-form";
import userUpdateHandler from "@/app/handlers/userUpdate";

function EditProfile() {

  const { register, setValue, handleSubmit } = useForm();

  const [gender, setGender] = useState("1");
  const [datevisible, setDateVisible] = useState(false);
  const now = new Date();
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: "/Reza1.jpg",
    },
  ]);

  /// Handle Submit
  const onSubmit = (data: any) => {
    userUpdateHandler({...data,'user_gender':gender});
  };
  /// End Handle Submit

  useEffect(() => {
    (async () => {
      const data = await getLoadInfo();
       
      ///Load user info
      setValue("name", data.user.name);
      setValue("family", data.user.family);
      setValue("user_desc",data.user.user_desc);
      setGender(data.user.user_gender)
      ///End load user info

    })();
  }, [setValue,setGender]);

  async function mockUpload(file: File) {
    return {
      url: URL.createObjectURL(file),
    };
  }

  return (
    <>
      <div className="py-3 pb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center py-8">
            <ImageUploader
              value={fileList}
              onChange={setFileList}
              maxCount={1}
              upload={mockUpload}
              style={{ "--cell-size": "150px", borderRadius: "80px" }}
            >
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 80,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#999999",
                }}
              >
                <PictureOutline
                  className="rounded-full"
                  style={{ width: "150px" }}
                />
              </div>
            </ImageUploader>
          </div>

          {/* NAME */}
          <Form.Item
            label="Name"
            name="Name"
            className="font-extrabold text-3xl"
          >
            <input
              placeholder="Your name"
              className="font-normal"
              {...register("name")}
            />
          </Form.Item>

          {/* END NAME */}

          {/* FAMILY NANE */}
          <Form.Item
            label="Family"
            name="Family"
            className="font-extrabold text-3xl"
          >
            <input
              placeholder="Your family name"
              className="font-normal"
              {...register("family")}
            />
          </Form.Item>
          {/* END FAMILY NAME */}

          {/* BIRTH DATE */}
          <Form.Item style={{ fontSize: "13px" }}>
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
          <Form.Item
            label="Gender"
            name="Gender"
            className="font-extrabold text-3xl"
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
              value={[gender]}
              onChange={(v) => {
                if (v.length) {
                  setGender(v[0]);
                }
              }}
              defaultValue={["2"]}
            />
          </Form.Item>
          {/* END GENDER */}

          {/* BIO */}
          <Form.Item
            name="address"
            label="Bio"
            help="Let others know about you"
            className="font-extrabold text-3xl"
          >
            <textarea
            
              placeholder="Write atleast three lines about yourself"
              maxLength={100}
              rows={5}
              style={{ fontSize: "13px", fontWeight: "normal" }}
              {...register("user_desc")}
            />
          </Form.Item>
          {/* END BIO */}

          {/* SUBMIT BUTTON */}
          <div className="py-5 px-2 mt-3">
            <input
              type="submit"
              className="btn-regular w-full m-1"
              style={{ fontSize: "14px" }}
              value="SAVE"
            />
            {/* END SUBMIT BUTTON */}
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
