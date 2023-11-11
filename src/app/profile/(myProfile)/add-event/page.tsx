"use client";
import { Button, DatePicker, Form, Selector, Toast } from "antd-mobile";
import { Skeleton } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateHandler } from "@/app/api-client/users";


function AddEvent() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gender, setGender] = useState("1");
  const [rel, setRel] = useState("1");
  const [type, setType] = useState("1");
  const [sbirth, setSbirth] = useState<string>("");
  const [datevisible, setDateVisible] = useState(false);
  const now = new Date();
  const [birth, setbirth] = useState<Date>();
  const minDate = new Date(1960, 1, 1);

  /// Handle Submit
  const onSubmit = (data: any) => {
    // updateHandler({
    //   ...data,
    //   user_gender: gender,
    //   birth_date: sbirth,
    // });
  };
  /// End Handle Submit

  return (
    <>
      <div className="p-3 pb-20">
        <h1 className="main-head">Add event</h1>
        <h4>
          Here you can add some important or memorial events like birthday and
          wedding aniversary. Wiishy will aware you ten days in advance to make
          a plan for this vital parts of your life!
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* RELATIONSHIP */}

          <Form.Item
            label="Relationship"
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
                  label: "Friend",
                  value: "1",
                },
                {
                  label: "Husband",
                  value: "2",
                },
                {
                  label: "Wife",
                  value: "3",
                },
                {
                  label: "Girl friend",
                  value: "4",
                },
                {
                  label: "Boy friend",
                  value: "5",
                },
                {
                  label: "Parent",
                  value: "6",
                },
                {
                  label: "Family member",
                  value: "7",
                },
              ]}
              value={[String(rel)]}
              defaultValue={[String(rel)]}
              onChange={(v) => {
                if (v.length) {
                  setRel(v[0]);
                }
              }}
            />
          </Form.Item>
          {/* END RELATIONSHIP */}

          {/* EVENT TYPE */}
          <Form.Item
            label="Event type"
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
                  label: "Birthday",
                  value: "1",
                },
                {
                  label: "Wedding anniversary",
                  value: "2",
                },
              ]}
              value={[String(type)]}
              defaultValue={[String(type)]}
              onChange={(v) => {
                if (v.length) {
                  setType(v[0]);
                }
              }}
            />
          </Form.Item>
          {/* END EVENT TYPE */}

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
              Choose the date
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

          <br />
          {/* SUBMIT BUTTON */}

          <div className="pb-5 px-0 mt-1 ">
            <Button
              type="submit"
              className="btn btn-regular w-full m-1"
              style={{ fontSize: "14px" }}
            >
              Save event
            </Button>
          </div>

          {/* END SUBMIT BUTTON */}
        </form>
      </div>
    </>
  );
}

export default AddEvent;
