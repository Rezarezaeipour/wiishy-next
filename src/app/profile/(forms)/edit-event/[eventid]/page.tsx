"use client";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Selector,
  Toast,
} from "antd-mobile";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addEvent, getEventDetail } from "@/app/api-client/events";

function EditEvent({ params }: { params: { eventid: number } }) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [gender, setGender] = useState("1");
  const [rel, setRel] = useState("1");
  const [type, setType] = useState("1");
  const [sbirth, setSbirth] = useState<string>("");
  const [datevisible, setDateVisible] = useState(false);
  const [event, setEvent] = useState<Object>();
  const now = new Date();
  const [birth, setbirth] = useState<Date>();
  const minDate = new Date(1960, 1, 1);

  useEffect(() => {
    (async () => {
      const response = await getEventDetail(params.eventid);
      console.log("response", await response);
      response && response.status == "success"
        ? (() => {
          console.log(response.event.name );
            const date = response.event.event_date ? new Date(response.event.event_date) : new Date() ;
            setValue("name", response.event.name);
            setValue("family", response.event.family);
            setGender(response.event.gender);
            setRel(response.event.relationship);
            setType(response.event.event_type);
            setbirth(date)
          })()
        : (()=>{setEvent("");console.log(response.status)})()
    })();
  }, []);

  /// Handle Submit
  const onSubmit = async (data: any) => {
    const response = await addEvent({
      ...data,
      user_gender: gender,
      rel: rel,
      type: type,
      date: sbirth,
    });
    Toast.show({
      content: response,
      position: "bottom",
    });
    reset();
  };

  /// End Handle Submit

  return (
    <>
      <div className="p-3 pb-20">
        <h1 className="main-head">Edit event</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*  DATE */}
          <h2 className="mt-4 text-[20px]">When?</h2>
          <Form.Item
            style={{
              paddingTop: "5px",
              fontSize: "13px",
              backgroundColor: "transparent",
            }}
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
              title="Date"
              onConfirm={(value) => {
                setSbirth(
                  `${value?.getFullYear()}-${value?.getMonth()}-${value?.getDate()}`
                );
              }}
            >
              {(value) => "  " + value?.toDateString()}
            </DatePicker>
            <p>
              Please add the date of birthday or your wedding date. We aware you
              annualy this important event in event feed and also by email.
            </p>
          </Form.Item>
          {/* END DATE */}

          <h2 className="mt-4 text-[20px]">Abou who?</h2>
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

          <br />

          {/* SUBMIT BUTTON */}
          <div className="pb-5 px-2 mt-1 fixed bottom-0 left-0 w-full z-10">
            <Button
              type="submit"
              className="btn btn-regular btn-big-style w-full m-1"
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

export default EditEvent;
