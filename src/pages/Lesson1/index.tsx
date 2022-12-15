import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";

function Lesson1() {
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(new Date());
  useEffect(() => {
    setTimeout(() => {
      setTimer(new Date());
    }, 1000);
  }, []);
  return (
    <Space
      style={{
        width: "100%",
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>{timer.valueOf()}</h2>
      <Space style={{ marginTop: 12 }}>
        <Input
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
      </Space>
    </Space>
  );
}

export default Lesson1;
