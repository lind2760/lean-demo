import React, {
  cloneElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FieldContext from "@/component/RCForm/FieldContext";
import classNames from "classnames/bind";
import styles from "./style/index.less";

const cx = classNames.bind(styles);

/**
 * 字段组件
 * 实现双向数据绑定
 * input 显示的是formInstance.store的值
 * 输入框值改变时同步formInstance
 */
function Field(props: {
  children?: any;
  name?: string;
  label?: string;
  rules?: Record<any, any>[];
}) {
  const { setFieldValue, getFieldValue, registerField } =
    useContext(FieldContext)!;
  const { children, name, label, rules } = props;
  const mountRef = useRef(false);
  const [, setRefreshCode] = useState(0);
  const onStoreChange = () => {
    setRefreshCode((prevState) => prevState + 1);
  };
  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      registerField({ name: name || "", rules: rules || [], onStoreChange });
    }
  }, [name, registerField, rules]);

  const getController = (childProps: any) => {
    return {
      ...childProps,
      // value跟onChange是react属性-会自身同步到原生dom上
      value: getFieldValue(name || ""),
      onChange: (e: any) => setFieldValue(name || "", e.target.value),
    };
  };

  return (
    <div className={cx("rc_form_item")}>
      <span>{label}:</span>
      <span>{cloneElement(children, getController(children.props))}</span>
    </div>
  );
}

Field.defaultProps = {
  children: undefined,
  name: undefined,
  label: undefined,
  rules: [],
};

export default Field;
