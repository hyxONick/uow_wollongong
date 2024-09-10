import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  GetProp,
  message,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { FC } from "react";

const { Title } = Typography;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ImageUploadProps {
  existFiles: UploadFile[];
  onUploadChange: (fileList: UploadFile[]) => void;
  maxImages?: number;
}

export const ImageUpload: FC<ImageUploadProps> = (props) => {
  const { existFiles, maxImages = 9, onUploadChange } = props;

  const onImageChange: UploadProps["onChange"] = (info) => {
    onUploadChange(info.fileList);
  };

  const beforeUpload = (file: FileType) => {
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error("Image must smaller than 3MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <Flex vertical gap={2} style={{ margin: "30px" }}>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Title level={4}>
          Upload Images ({existFiles.length}/{maxImages})
        </Title>
        <Button onClick={() => onUploadChange([])}>Clear All Images</Button>
      </Flex>

      <Upload
        accept="image/*"
        action=""
        listType="picture-card"
        fileList={existFiles}
        onChange={onImageChange}
        maxCount={maxImages}
        beforeUpload={beforeUpload}
      >
        {existFiles.length >= maxImages ? null : (
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        )}
      </Upload>
    </Flex>
  );
};
