import React, { useCallback, useState } from "react";
import { Button, Space } from "antd";
import Category, { CategoryItemEntity } from "@/pages/Lesson2/Category";
import Loading from "@/component/Loading";

function Lesson2() {
  const [categoryInfo, setCategoryInfo] = useState<null | CategoryItemEntity>(
    null
  );
  const [, setRefreshCode] = useState(0);
  // const lastRef = useRef<any>(null);

  const syncCategoryInfo = useCallback((data: CategoryItemEntity) => {
    setCategoryInfo({ ...data });
  }, []);

  console.log(syncCategoryInfo);
  return (
    <Space direction="vertical">
      <Space>
        <h3>菜单列表死循环演示</h3>
        <Button
          type="primary"
          onClick={() => setRefreshCode((prevState) => prevState + 1)}
        >
          刷新
        </Button>
      </Space>
      <Category
        syncFunc={setCategoryInfo}
        /*        syncFunc={(data) => {
                          setCategoryInfo(data);
                        }} */
      />
      <section>
        <Space>展示区域</Space>
        <Space
          style={{
            width: "100%",
            height: 160,
            background: "lightcyan",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!categoryInfo ? (
            <Loading />
          ) : (
            <span>
              现在展示的是{" "}
              <span style={{ color: "red" }}>{categoryInfo.categoryName}</span>
              的内容，id为{" "}
              <span style={{ color: "red" }}>{categoryInfo.categoryId}</span>
            </span>
          )}
        </Space>
      </section>
    </Space>
  );
}

export default Lesson2;
