'use client'
import { Avatar, Button, CascadePickerView, DatePicker, Form, Image, ImageUploadItem, ImageUploader, Input, List, Picker, Selector, TextArea } from "antd-mobile";
import { PictureOutline } from "antd-mobile-icons";
import { useState } from "react";

function EditProfile() {
    const [gender, setGender] = useState('1');
    const [datevisible, setDateVisible] = useState(false);
    const columns = [['86', '01', '02', '03']];
    const now = new Date();
    const [fileList, setFileList] = useState<ImageUploadItem[]>([
        {
            url: '',
        },
    ])

    async function mockUpload(file: File) {

        return {
            url: URL.createObjectURL(file),
        }
    }

    return (

        <>
            <div className="py-3 pb-20">
                <Form  layout='vertical' mode="card" >
                    <div className="flex justify-center py-8">
                        <ImageUploader value={fileList} onChange={setFileList}
                            maxCount={1} upload={mockUpload} style={{'--cell-size': '150px', borderRadius: '80px'}}>
                            <div
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 80,
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#999999',
                                }}
                            >
                                <PictureOutline className="rounded-full" style={{  width : '150px' }} />
                            </div>
                        </ImageUploader>
                    </div>

                    <Form.Item label='Name' name='Name' className="font-extrabold text-3xl"  >
                        <Input placeholder='Your name' clearable className="font-normal"  />
                    </Form.Item>
                    <Form.Item label='Family Name' name='Family' className="font-extrabold text-3xl">
                        <Input placeholder='Your family name' clearable className="font-normal"/>
                    </Form.Item>
                  
                    <Form.Item style={{'fontSize':'13px'}}>
                        <Button className="btn-regular" style={{fontSize:'14px'}}
                            onClick={() => {
                                setDateVisible(true)
                            }}
                        >
                            Birth Date
                        </Button>
                        <DatePicker
                            visible={datevisible}
                            onClose={() => {
                                setDateVisible(false)
                            }}
                            defaultValue={now}
                            max={now}
                            cancelText="Cancel"
                            confirmText="Add"
                            title='Your birthday'
                        >
                            {value => "  " + value?.toDateString()}
                        </DatePicker>
                    </Form.Item>
                    <Form.Item label='Gender' name='Gender' className="font-extrabold text-3xl">
                        <Selector
                            style={{
                                '--border-radius': '100px',
                                '--border': 'solid transparent 1px',
                                '--checked-border': 'solid var(--adm-color-primary) 1px',
                                '--padding': '8px 24px',
                                fontSize:'13px',
                                fontWeight:'normal'
                            }}
                            showCheckMark={false}
                            options={[
                                {
                                    label: 'Man',
                                    value: '1',
                                },
                                {
                                    label: 'Woman',
                                    value: '2',
                                },
                                {
                                    label: 'Others',
                                    value: '3',
                                },
                            ]}
                            value={[gender]}
                            onChange={v => {
                                if (v.length) {
                                    setGender(v[0])
                                }
                            }}
                            defaultValue={['1']}
                        />
                    </Form.Item>
                    <Form.Item name='address' label='Bio' help='Let others know about you' className="font-extrabold text-3xl">
                        <TextArea 
                            placeholder='Write atleast three lines about yourself'
                            maxLength={100}
                            rows={5}
                            showCount
                            style={{fontSize:'13px' , fontWeight:'normal'}}
                        />
                    </Form.Item>


                </Form>
            </div>

        </>);
}

export default EditProfile;