import { LeftOutlined, MinusCircleFilled } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import UserSchemas from "./UserSchemas";
const { Text } = Typography;

function SaveSegment() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [segmentSchema, setSegmentSchema] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSaveSegment = () => {
    if (segmentName === "") {
      alert("Please enter segment Name!");
      return;
    }

    if (segmentSchema.length === 0) {
      alert("Please select segment schema!");
      return;
    }

    axios
      .post("https://webhook.site/1b3432a3-3795-4deb-846b-c9f7df8e4125", {
        segment_name: segmentName,
        schema: segmentSchema,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Save Segment
        </Button>
      </Space>

      <Drawer
        closeIcon={<LeftOutlined />}
        title="Saving Segment"
        placement="right"
        width={500}
        onClose={onClose}
        visible={visible}
        footer={
          <Space>
            <Button type="primary" onClick={onSaveSegment}>
              Save the Segment
            </Button>
            <Button danger onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item label="Enter the Name of the Segment">
            <Input
              placeholder="Name of the Segment"
              allowClear
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </Form.Item>
          <Space direction="vertical">
            <p style={{ float: "right" }}>
              <Text>
                To save your sesgment, you need to add the schemas to build the
                query
              </Text>
            </p>
            <p style={{ float: "right" }}>
              <Text>
                <MinusCircleFilled style={{ color: "green" }} /> - User Traits
                &emsp;
                <MinusCircleFilled style={{ color: "red" }} /> - Group Traits
              </Text>
            </p>
          </Space>

          <Space
            style={{ paddingTop: "20px", width: "100%" }}
            direction="vertical"
          >
            <UserSchemas setSegmentSchema={setSegmentSchema} />
          </Space>
        </Form>
      </Drawer>
    </>
  );
}

export default SaveSegment;
