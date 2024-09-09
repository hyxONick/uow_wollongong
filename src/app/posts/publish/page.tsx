"use client"
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  message
} from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const NewPublish: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isUpdate, setisUpdate] = useState(true)
  const validateImage: UploadProps['onChange'] = ({ fileList: newList }) => {
    if (isUpdate) {
      setFileList(newList)
    }
  }
  const beforeUpload = (file: FileType) => {
    const isImage = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff', 'image/svg+xml', 'image/x-icon', 'image/heic', 'image/heif'].includes(file.type);

    if (!isImage) {
      message.error('You can only upload Image file!')
      setisUpdate(false)
      return false
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error('Image must smaller than 3MB!')
      setisUpdate(false)
      return false
    }
    setisUpdate(true)
    return true;
  }
  const handleSubmit = (values:any) =>{
    console.log(values)
  }
  const validateMessages = {
    required: "'${name}' is required!",
  }
  return (
    <>
      <Form
        labelCol={{ xs: 8, sm: 6, md: 4 }}
        wrapperCol={{  xs: 16, sm: 18, md: 20 }}
        layout="horizontal"
        style={{ maxWidth: 560,width: '100%', margin: '0 auto'  }}
        onFinish={handleSubmit}
      >
        <Flex vertical gap={2} style={{ margin: "30px" }}>
          <Flex justify="space-between"style={{ width: '100%' }} >
            <Title level={4}>Upload Images ({fileList.length}/9)</Title>
            <Button onClick={() => setFileList([])}>Clear All Images</Button>
          </Flex>
          <Form.Item valuePropName="fileList" name="picUrl" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload at least one image' }]}>
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              onChange={(info) => validateImage(info)}
              maxCount={9}
              beforeUpload={beforeUpload}
            >
              {fileList.length >= 9 ? null : <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>}
            </Upload>
          </Form.Item>
        </Flex>
        <Flex vertical gap={2} style={{ marginLeft: "30px" }}>
          <Title level={4}>Content</Title>
          <Form.Item name="title" rules={[{ required: true, message: 'Title can not be empty' }]}>
            <Input maxLength={30} showCount style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="Content" rules={[{ required: true, message: 'Content can not be empty' }]}>
            <TextArea showCount maxLength={1000} style={{ height: 120, width: "100%", resize: 'none' }} />
          </Form.Item>
        </Flex>
        <Flex vertical gap={2} style={{ marginLeft: "30px" }}>
          <Title level={4}>Topics</Title>
          <Form.Item name="topics">
            <Select defaultValue="Others" style={{width: "40%"}} >
              <Select.Option value="Accommodation">Accommodation</Select.Option>
              <Select.Option value="Transportation">Transportation</Select.Option>
              <Select.Option value="Living">Living</Select.Option>
              <Select.Option value="Cuisine">Cuisine</Select.Option>
              <Select.Option value="Shopping">Shopping</Select.Option>
              <Select.Option value="Discounts"> Discounts</Select.Option>
              <Select.Option value="Guide"> Guide</Select.Option>
              <Select.Option value="Flights">Flights</Select.Option>
              <Select.Option value="Travel Tips">Travel Tips</Select.Option>
              <Select.Option value="Attractions">Attractions</Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </Form.Item>
        </Flex>
        <Flex vertical gap={2} style={{ marginLeft: "30px" }}>
          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button type="primary" danger htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};
export default NewPublish