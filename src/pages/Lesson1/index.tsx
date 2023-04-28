import React, { useEffect, useMemo, useState } from "react";
// import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import dayjs from "dayjs";

function Lesson1() {
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(dayjs());
  useEffect(() => {
    setInterval(() => {
      setTimer(dayjs());
    }, 1000);
  }, []);

  const todos = useMemo(() => {
    console.log("进行了计算");
    return counter;
  }, [counter]);
  /*  const todos = () => {
            console.log(`${dayjs(timer).format("YYYY-MM-DDTHH:mm:ss")}---进行了计算`);
            return counter;
          }; */
  return (
    <Space
      style={{
        width: "100%",
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>{dayjs(timer).format("YYYY-MM-DDTHH:mm:ss")}</h2>
      <Space style={{ marginTop: 12 }}>
        <Input
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
      </Space>
      <Space>输入框value：{todos}</Space>
    </Space>
  );
}

export default Lesson1;
