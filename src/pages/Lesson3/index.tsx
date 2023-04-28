import React, { useCallback, useReducer, useRef } from "react";
import { Button } from "antd";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    // case "get":

    default:
      throw new Error("error action.type");
  }
};

function Lesson3() {
  const [state, dispatch] = useReducer(reducer, { count: 199 });
  // eslint-disable-next-line no-undef
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const getState = useCallback(() => {
    return state.count;
  }, [state.count]);

  return (
    <>
      <Button
        onClick={() => {
          if (!timerRef.current) {
            timerRef.current = setInterval(() => {
              console.log("state.count=================>", getState());
            }, 2000);
          }
        }}
      >
        点击开始
      </Button>
      苏南大叔有 {state.count} 个心眼子
      <Button onClick={() => dispatch({ type: "increment" })}>+</Button>
      <br />
    </>
  );
}

export default Lesson3;
