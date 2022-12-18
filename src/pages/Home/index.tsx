import React from "react";
import Form, { FormItem } from "@/component/RCForm";
import classNames from "classnames/bind";
import styles from "./index.less";

const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx("content")}>
      {/* <Form<{ userName: string; password: number }> */}
      <Form
        style={{ marginTop: 24 }}
        initialValue={{
          userName: "张三 ",
          password: 123456,
        }}
        onFinish={(values) => {
          console.log(values);
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <FormItem
          name="userName"
          rules={[{ required: true, min: 3 }]}
          label="账号名"
        >
          <input placeholder="输入账号" />
        </FormItem>
        <FormItem name="password" rules={[{ required: true }]} label="密码">
          <input placeholder="输入密码" />
        </FormItem>
        <button type="submit" className={cx("button")}>
          提交
        </button>
      </Form>
    </div>
  );
}

export default HomePage;
