import React, { lazy, Suspense, ReactElement } from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

// 不需要懒加载的页面组件
import Permission from "@/component/Permisson";
import Layout from "@/component/Layout";
import ErrorBoundary from "@/component/ErrorBoundary";

// 需要懒加载的页面组件
const HomePage = lazy(() => import("@/pages/Home"));
const Lesson1 = lazy(() => import("@/pages/Lesson1"));
const Lesson2 = lazy(() => import("@/pages/Lesson2"));
const Lesson3 = lazy(() => import("@/pages/Lesson3"));
const Lesson4 = lazy(() => import("@/pages/Lesson4"));

/**
 * @param Component 懒加载的组件
 * @param code 用于判断权限的字段
 * @returns
 */
function LazyLoad(
  Component: React.LazyExoticComponent<() => ReactElement>,
  code?: number
) {
  return (
    <Permission code={code}>
      <Suspense fallback={<div>loading...</div>}>
        <Component />
      </Suspense>
    </Permission>
  );
}

export interface UserInfo {
  name: string;
  age: number;
  permissionRoutes: string[];
  code: number;
}

/**
 * @description 模拟请求用户信息
 * @returns
 */
export const getUserInfo = (): Promise<UserInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "jianjian",
        age: 12,
        permissionRoutes: ["lesson"],
        code: 200,
      });
    }, 1000);
  });
};

/**
 * @description 这个loader函数会在路由渲染前触发,所以可以用来做路由权限控制和登陆重定向
 * @description (取代请求拦截器中的登陆重定向)
 * @description 这个loader函数返回值可以在页面中通过 useRouteLoaderData(id)或者useLoaderData获取
 */
const rootLoader = async () => {
  console.log("页面加载前请求用户信息");
  // 这里用假的接口模拟下
  const { permissionRoutes, name, age, code } = await getUserInfo();
  // 假设20000代表登陆过期
  if (code === 20000) {
    redirect("/login");
  }
  return {
    name,
    age,
    permissionRoutes,
  };
};

const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    id: "root",
    errorElement: <ErrorBoundary />,
    element: <Layout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        path: "/home/rcForm",
        element: LazyLoad(HomePage, 200),
      },
    ],
  },
  {
    path: "/lesson",
    errorElement: <ErrorBoundary />,
    id: "lesson",
    loader: rootLoader,
    children: [
      {
        index: true,
        path: "/lesson/1",
        element: LazyLoad(Lesson1),
      },
      {
        path: "/lesson/2",
        element: LazyLoad(Lesson2),
      },
      {
        path: "/lesson/3",
        element: LazyLoad(Lesson3),
      },
      {
        path: "/lesson/4",
        element: LazyLoad(Lesson4),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
];

export const routes = createBrowserRouter(routerConfig);
