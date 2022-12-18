import React, { useEffect, useRef, useState } from "react";

import { Space } from "antd";

export type CategoryItemEntity = { categoryName: string; categoryId: number };
const list: CategoryItemEntity[] = [];
for (let i = 0; i < 8; i += 1) {
  list.push({ categoryName: `菜单${i + 1}`, categoryId: i });
}

// eslint-disable-next-line no-unused-vars
function Category(props: { syncFunc: (data: CategoryItemEntity) => void }) {
  const { syncFunc } = props;
  const [categoryList, setCategoryList] = useState<CategoryItemEntity[]>([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const lastRef = useRef<any>(null);
  useEffect(() => {
    setTimeout(() => {
      setCategoryList(list);
    }, 3000);
  }, []);

  useEffect(() => {
    if (categoryList[selectIndex]) {
      // syncFunc(categoryList[selectIndex]);
      lastRef.current = syncFunc;
      syncFunc({ ...categoryList[selectIndex] });
    }
  }, [categoryList, selectIndex, syncFunc]);
  // const a = { test: "123" };
  // const b = { ...a };
  // console.log("a === b====================>", a === b);

  return (
    <Space size={[8, 0]}>
      {categoryList.map((item) => {
        return (
          <Space
            style={{
              padding: "12px 8px",
              color: selectIndex === item.categoryId ? "white" : "black",
              background:
                selectIndex === item.categoryId ? "lightblue" : "gray",
            }}
            key={item.categoryId}
            onClick={() => {
              setSelectIndex(item.categoryId);
            }}
          >
            {item.categoryName}
          </Space>
        );
      })}
    </Space>
  );
}

export default Category;
