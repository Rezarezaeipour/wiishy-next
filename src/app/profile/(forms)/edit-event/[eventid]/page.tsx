"use client";
import {
  Button,
  DatePicker,
  Dialog,
  Divider,
  Form,
  Picker,
  Selector,
  Toast,
} from "antd-mobile";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  DeleteEvent,
  addEvent,
  editEvent,
  getEventDetail,
} from "@/app/api-client/events";
import { useRouter } from "next/navigation";
import * as shamsi from "shamsi-date-converter";
import { Radio, Space } from "antd";

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
  const [loading, setLoading] = useState(false);
  const now = new Date();
  const [birth, setbirth] = useState<Date>();
  const [shamsiBirth, setShamsiBirth] = useState(['1402','1','1'])
  const minDate = new Date(1960, 1, 1);
  const [repeatable, setRepeatable] = useState(0);
  

  const router = useRouter();

  /// Shamsi Calendar
  const [shamsidatevisible, setShamsiDateVisible] = useState(false);
  var yeararray = [];
  for (let i = 1404; i >= 1340; i--) {
    yeararray.push({ label: i.toString(), value: i.toString() });
  }
  var montharray = [];
  for (let j = 1; j <= 12; j++) {
    montharray.push({ label: j.toString(), value: j.toString() });
  }
  var dayarray = [];
  for (let x = 1; x <= 31; x++) {
    dayarray.push({ label: x.toString(), value: x.toString() });
  }
  const basicColumns = [yeararray, montharray, dayarray];

  useEffect(() => {
    (async () => {
      const response = await getEventDetail(params.eventid);
      response && response.status == "success"
        ? (() => {
           
            const date = response.event.event_date
              ? new Date(response.event.event_date)
              : new Date();
            setValue("name", response.event.name);
            setValue("family", response.event.family);
            setGender(response.event.gender);
            setRel(response.event.relationship);
            setType(response.event.event_type);
            setRepeatable(response.event.repeatable);
            setbirth(date);
            setSbirth(
              `${date?.getFullYear()}-${
                date?.getMonth() + 1
              }-${date?.getDate()}`
            );
           
            const sb = shamsi.gregorianToJalali(parseInt(date?.getFullYear().toString()), parseInt(date?.getMonth().toString())+1 as any, parseInt(date?.getDate().toString()) as any )
           
            setShamsiBirth([sb[0].toString(),sb[1].toString(),sb[2].toString()]);
          })()
        : (() => {
            setEvent("");

          })();
    })();
  }, [params.eventid,setValue]);

  /// Handle Submit
  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await editEvent({
      ...data,
      user_gender: gender,
      rel: rel,
      type: type,
      date: sbirth,
      id: params.eventid,
      repeatable: repeatable,
    });
    Toast.show({
      content: response,
      position: "bottom",
    });
    (() => {
      
      setTimeout(() => {
        router.push("/profile/events");
      }, 1000);
    })();
  };

  /// End Handle Submit

  /// Delete Handler
  const deleteHandler = async () => {
    setLoading(true);
    const res = await DeleteEvent(params.eventid);
    res && res.status === "success"
      ? (() => {
          Toast.show({
            content: res.message,
            position: "bottom",
          });

         
          setTimeout(() => {
            router.push("/profile/events");
          }, 1000);
        })()
      : "";
  };
  /// End Delete Handler

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
            <Button
              className="btn-regular ml-1"
              style={{ fontSize: "14px" }}
              onClick={() => {
                setShamsiDateVisible(true);
              }}
            >
              Shamsi Calendar
            </Button>
            <p className="inline-block ml-3 font-bold">
              {"  " + sbirth + "  "}
            </p>

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
                  `${value?.getFullYear()}-${
                    value?.getMonth() + 1
                  }-${value?.getDate()}`
                );
              }}
            >
              {/* {(value) => "  " + value?.toDateString()} */}
              {(value) => "  "}
            </DatePicker>

            {/* Shamsi */}
            <Picker
              value={shamsiBirth}
              columns={basicColumns}
              visible={shamsidatevisible}
              onClose={() => {
                setShamsiDateVisible(false);
              }}
              cancelText="Cancel"
              confirmText="Add"
              title="Date"
              onConfirm={(value) => {
                
               
                value[0] && value[1] && value[2]
                  ? (() => {
                     setShamsiBirth([value[0].toString(),value[1].toString(),value[2].toString(),]);
                      const georgian = shamsi.jalaliToGregorian(
                        parseInt(value[0].toString()),
                        parseInt(value[1].toString()) as any,
                        parseInt(value[2].toString()) as any
                      );
                      setSbirth(
                        `${georgian[0].toString()}-${georgian[1].toString()}-${georgian[2].toString()}`
                      );
                    })()
                  : "";
              }}
            >
              {(value) => "  "}
            </Picker>
            <p className="font-light lin text-gray-400 leading-4 mt-1">
              Please add the date of birthday or your wedding date.
            </p>

            <Radio.Group
              value={repeatable}
              defaultValue="0"
              className="mt-4"
              onChange={(val) => {
                setRepeatable(val.target.value);
              }}
            >
              <Space direction="vertical" >
                <Radio value="1">Repeatable? Wiishy announce you yearly</Radio>
                <Radio value="0">Just Once</Radio>
              </Space>
            </Radio.Group>
            <p className="font-light lin text-gray-400 leading-4 mt-1">
              For event like birthday choose Repeatable, and for single happen
              event choose JustOnce.
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
          <div className="flex flex-row pb-5 px-2 mt-1 fixed bottom-0 left-0 w-full z-10">
            <Button
              loading={loading}
              type="submit"
              className="btn btn-regular btn-big-style w-full m-1  basis-3/4"
              style={{ fontSize: "14px" }}
            >
              Update event
            </Button>
            <Button
              loading={loading}
              type="button"
              className="btn btn-regular-outline btn-big-style w-full m-1 basis-1/4 backdrop-blur-sm"
              style={{ fontSize: "14px" }}
              onClick={async () => {
                const result = await Dialog.confirm({
                  content: "Are you sure to delete this event?",
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
          </div>

          {/* END SUBMIT BUTTON */}
        </form>
      </div>
    </>
  );
}

export default EditEvent;
