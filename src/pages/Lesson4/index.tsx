import React from "react";

import classNames from "classnames/bind";
import styles from "./index.module.less";

const cx = classNames.bind(styles);

function Lesson4() {
  return (
    <>
      <h2>CSS 3D魔方</h2>
      <div
        className={cx("box_container")}
        id="view"
        style={{ width: 160, height: 160, margin: "80px auto 0" }}
      >
        <div id="box" className={cx("box_wrap")}>
          <div className={cx("one")}>A</div>
          <div className={cx("two")}>B</div>
          <div className={cx("three")}>C</div>
          <div className={cx("four")}>D</div>
          <div className={cx("five")}>E</div>
          <div className={cx("six")}>F</div>
        </div>
      </div>
    </>
  );
}

export default Lesson4;
