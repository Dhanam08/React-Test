import { Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import UserSchema from "./UserSchema";

function UserSchemas(props) {
  const [isRerender, setIsRerender] = useState("");
  const [selectedUserSchemaValue, setSelectedUserSchemaValue] = useState([]);

  const dropDownValue = [
    { name: "First Name", value: "first_name" },
    { name: "Last Name", value: "last_name" },
    { name: "Gender", value: "gender" },
    { name: "Age", value: "age" },
    { name: "Account Name", value: "account_name" },
    { name: "City", value: "city" },
    { name: "State", value: "state" },
  ];

  //   useEffect(() => {
  //     props.setSegmentSchema(
  //       selectedUserSchemaValue.map((item) => {
  //         if (item !== "_null") {
  //           return dropDownValue.find((dvItem) => dvItem.value === item);
  //         } else {
  //           return false;
  //         }
  //       })
  //     );
  //   });

  const buildSchema = () => {
    const testValue = selectedUserSchemaValue.map((item) => {
      if (item !== "_null") {
        return dropDownValue.find((dvItem) => dvItem.value === item);
      } else {
        return false;
      }
    });
    props.setSegmentSchema(testValue);
  };

  const getDropDownValues = (currentItem) => {
    return dropDownValue.filter(
      (item) =>
        currentItem === item.value ||
        !selectedUserSchemaValue.includes(item.value)
    );
  };

  const addNewSchema = () => {
    if (
      selectedUserSchemaValue.length === 0 ||
      selectedUserSchemaValue[selectedUserSchemaValue.length - 1] === "_null"
    ) {
      alert("Please select user schema before add another!");
    } else {
      selectedUserSchemaValue.push("_null");
      setIsRerender(new Date().toString());
      buildSchema();
    }
  };

  const onSelectSchema = (value, oldValue = null) => {
    if (
      selectedUserSchemaValue[selectedUserSchemaValue.length - 1] === "_null"
    ) {
      selectedUserSchemaValue.pop();
    }

    if (oldValue === null || oldValue === "") {
      selectedUserSchemaValue.push(value);
    } else {
      selectedUserSchemaValue[selectedUserSchemaValue.indexOf(oldValue)] =
        value;
    }

    setIsRerender(new Date().toString() + Math.floor(Math.random() * 100));
    buildSchema();
  };

  const removeSelectedItem = (value) => {
    if (value === "" || value === null) {
      selectedUserSchemaValue.pop();
    }
    setSelectedUserSchemaValue(
      selectedUserSchemaValue.filter((item) => item !== value)
    );
    setIsRerender(new Date().toString());
    buildSchema();
  };

  const newSchemaBtn = (
    <Space style={{ marginTop: "20px" }}>
      <Button
        type="link"
        style={{ borderBottom: "1px solid #1890ff" }}
        onClick={addNewSchema}
      >
        + Add new schema
      </Button>
    </Space>
  );

  return selectedUserSchemaValue.length === 0 ? (
    <>
      <UserSchema
        options={dropDownValue}
        onSelect={onSelectSchema}
        onRemove={removeSelectedItem}
      />
      {}
      {selectedUserSchemaValue.length >= dropDownValue.length
        ? ""
        : newSchemaBtn}
    </>
  ) : (
    <>
      {selectedUserSchemaValue.map((item) => {
        return (
          <UserSchema
            key={item}
            oldValue={item === "_null" ? "" : item}
            options={getDropDownValues(item)}
            onSelect={onSelectSchema}
            onRemove={removeSelectedItem}
          />
        );
      })}
      {selectedUserSchemaValue.length >= dropDownValue.length
        ? ""
        : newSchemaBtn}
    </>
  );
}

export default UserSchemas;
