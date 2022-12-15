import React, { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const err = useRouteError() as any;
  console.log(err);
  return (
    <div>
      <p>出错啦～</p>
      <p>错误信息: {err?.message || ""}</p>
    </div>
  );
}

export default ErrorBoundary;
