import React from "react";
import { Form, Input } from "antd";

function BindData() {
  return (
    <Form>
      <Form.Item name="account" label="用户名">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input.Password />
      </Form.Item>
    </Form>
  );
}

export default BindData;
