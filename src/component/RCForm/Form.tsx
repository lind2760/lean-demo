import React, { CSSProperties, ReactNode, useRef } from "react";
import useForm from "@/component/RCForm/useForm";
import { ErrorFieldsEntity } from "@/component/RCForm/asyncValidator";
import FieldContext from "./FieldContext";

export type Store = Record<any, any>;

function Form<T extends Store>(props: {
  initialValue?: T;
  // eslint-disable-next-line no-unused-vars
  onFinish?: (values: T) => void;
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onFinishFailed?: (error: ErrorFieldsEntity) => void;
  style?: CSSProperties;
}) {
  const { initialValue, onFinish, children, onFinishFailed, style } = props;
  const mountRef = useRef(false);
  const [formInstance] = useForm();
  formInstance.setInitialValues(initialValue || {}, mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }
  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      style={{ ...style }}
      onSubmit={(event) => {
        event.stopPropagation();
        event.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}

Form.defaultProps = {
  initialValue: undefined,
  onFinish: undefined,
  onFinishFailed: undefined,
  style: undefined,
};
export default Form;
