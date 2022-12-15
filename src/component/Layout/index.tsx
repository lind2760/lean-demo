import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header style={{ width: "100%", height: 80, background: "lightblue" }}>
        顶部
      </header>
      <Outlet />
      <footer
        style={{
          width: "100%",
          height: 80,
          position: "fixed",
          bottom: 0,
          background: "darkblue",
        }}
      >
        底部
      </footer>
    </div>
  );
}

export default Layout;
