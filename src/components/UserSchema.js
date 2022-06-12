import { MinusCircleFilled, MinusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

function UserSchema(props) {
  const oldValue = props.oldValue || "";

  return (
    <div style={{ width: "100%", margin: "8px 0" }}>
      <Row align="center" justify="middle">
        <Col flex={3}>
          <MinusCircleFilled style={{ color: "green" }} />
        </Col>
        <Col flex={18}>
          <Select
            defaultValue={oldValue}
            style={{ width: "100%" }}
            onChange={(value) => {
              props.onSelect(value, oldValue);
            }}
          >
            <Option value="">Add Schema To Segment</Option>
            {props.options.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col flex={3}>
          <div style={{ float: "right" }}>
            <Button type="primary" onClick={() => props.onRemove(oldValue)}>
              <MinusOutlined />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UserSchema;
