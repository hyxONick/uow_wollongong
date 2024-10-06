"use client";
import React, { Fragment, useState } from "react";
import { Flex, Typography } from "antd";
import { Button, Form, Input, Select } from "antd";
import type { UploadFile } from "antd";
import { ImageUpload } from "./_components/imageUpload";
import { createPost } from "@/app/services/post";
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

  const handleSubmit = async (values: any) => {
    try {
      // 提取上传图片的 URL
      const picUrls = fileList.map(file => file.url || "");

      // // 准备提交的数据
      const postData = {
        slug: values.title.toLowerCase().replace(/\s+/g, "-"),
        title: values.title,
        body: values.Content,
        like: 0, // 默认 0 点赞
        category: values.topics || "Others",
        picUrls,
        authorId: "670280b6aefbd3915c3e8069", // 假设 authorId 是固定的（应替换为实际用户的 ID）从localStroage里面拿
      };
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      console.log('Post created:', data);
      // // 调用 createPost 创建帖子
      // const createdPost = await createPost(postData);
      console.log("Post created successfully:", handleSubmit);
    } catch (error) {
      console.error("Error creating post:", error);
    }
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
