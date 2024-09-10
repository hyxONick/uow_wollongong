"use client";
import React, { Fragment, useState } from "react";
import { Flex, Typography } from "antd";
import { Button, Form, Input, Select } from "antd";
import type { UploadFile } from "antd";
import { ImageUpload } from "./_components/imageUpload";
const { Title } = Typography;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const NewPublish: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const maxImages = 9;

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Fragment>
      <Form
        labelCol={{ xs: 8, sm: 6, md: 4 }}
        wrapperCol={{ xs: 16, sm: 18, md: 20 }}
        layout="horizontal"
        style={{ maxWidth: 560, width: "100%", margin: "0 auto" }}
        onFinish={handleSubmit}
      >
        <Form.Item>
          <ImageUpload
            existFiles={fileList}
            onUploadChange={setFileList}
            maxImages={maxImages}
          />
        </Form.Item>

        <Flex vertical gap={2} style={{ marginLeft: "30px" }}>
          <Title level={4}>Content</Title>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Title can not be empty" }]}
          >
            <Input maxLength={30} showCount style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="Content"
            rules={[{ required: true, message: "Content can not be empty" }]}
          >
            <TextArea
              showCount
              maxLength={1000}
              style={{ height: 120, width: "100%", resize: "none" }}
            />
          </Form.Item>
        </Flex>
        <Flex vertical gap={2} style={{ marginLeft: "30px" }}>
          <Title level={4}>Topics</Title>
          <Form.Item name="topics">
            <Select defaultValue="Others" style={{ width: "40%" }}>
              <Select.Option value="Accommodation">Accommodation</Select.Option>
              <Select.Option value="Transportation">
                Transportation
              </Select.Option>
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
    </Fragment>
  );
};
export default NewPublish;
