import React, { FC, PropsWithChildren } from "react";

// import { useRouteLoaderData } from "react-router-dom";

interface Iprops {
  code?: number;
  children: React.ReactNode;
}

// eslint-disable-next-line react/function-component-definition
const Permission: FC<PropsWithChildren<Iprops>> = (props) => {
  // 这个root是我们在前面路由中定义了 id: 'root'
  // const loaderData = useRouteLoaderData("root");
  const { children, code } = props;
  // if (code || loaderData?.permissionRoutes?.includes(code)) {
  if (code) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  return <div>403...</div>;
};

Permission.defaultProps = {
  code: 200,
};

export default Permission;
