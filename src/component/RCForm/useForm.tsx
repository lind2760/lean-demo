/*eslint-disable*/
import { useRef, useState } from "react";
import { Store } from "@/component/RCForm/Form";
import Schema from "@/component/RCForm/asyncValidator";

class FormStore {
  private store;
  private callbacks;
  private readonly forceRootRender;
  private readonly fieldEntities: FieldInstance[];

  constructor(forceUpdate: () => void) {
    this.store = Object.create(null);
    this.callbacks = Object.create(null);
    this.forceRootRender = forceUpdate;
    this.fieldEntities = [];
  }

  registerField = (fieldEntity: FieldInstance) => {
    if (!(fieldEntity.name in this.store)) {
      this.store[fieldEntity.name] = undefined;
    }
    this.fieldEntities.push(fieldEntity);
  };

  setFieldsValue = (newStore: Store) => {
    this.store = { ...this.store, ...newStore };
    this.fieldEntities.map((item) => {
      const currentFieldEntity = this.fieldEntities.find(
        (value) => value.name === item.name
      );
      currentFieldEntity?.onStoreChange();
    });
  };

  setFieldValue = (name: string, value: Store) => {
    this.store[name] = value;
    const currentFieldEntity = this.fieldEntities.find(
      (item) => item.name === name
    );
    currentFieldEntity?.onStoreChange();
  };

  getFieldValue = (name: string) => {
    return this.store[name];
  };

  _getRegisterValues = () => {
    return this.fieldEntities.reduce((previousValue, currentValue) => {
      const { name } = currentValue;
      return { ...previousValue, [name]: this.store[name] ?? undefined };
    }, {});
  };

  getFieldsValue = () => {
    return this._getRegisterValues();
  };

  setCallbacks = (callbacks: {
    onFinish: (store: any) => void;
    onFinishFailed: (store: any) => void;
  }) => {
    this.callbacks = callbacks;
  };

  setInitialValues = (initValues: Store, mounted: boolean = false) => {
    if (!mounted) {
      this.store = { ...initValues };
    }
  };

  // 校验表单值
  validateFields = async () => {
    // 把数组对象转为对象 如[{required: true,max: 3}] ==> {required: true,max: 3}
    // 整体转换
    const descriptors = this.fieldEntities.reduce(
      (previousValue, currentValue) => {
        const { rules, name } = currentValue;
        const descriptor: Record<any, any> = {};
        if (rules && rules.length) {
          let config: Record<any, any>;
          config = rules.reduce(
            (singleMemo, singleRule) => ({ ...singleMemo, ...singleRule }),
            {}
          );
          descriptor[name] = config;
        }
        return { ...previousValue, ...descriptor };
      },
      {}
    );
    return new Schema(descriptors).validate(this._getRegisterValues());
  };

  submit = () => {
    // 通过验证返回store到onFinish事件
    this.validateFields().then(
      () => {
        const { onFinish } = this.callbacks;
        if (onFinish) {
          onFinish(this._getRegisterValues());
        }
      },
      (reason) => {
        const { onFinishFailed } = this.callbacks;
        if (onFinishFailed) {
          onFinishFailed(reason);
        }
      }
    );
  };

  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
      setInitialValues: this.setInitialValues,
      registerField: this.registerField,
    };
  };
}

// 自定义hooks
// use开头 内部调用结合其他hooks完成功能
export default function useForm() {
  const formRef = useRef<FormInstanceType | undefined>(); // 避免多次渲染的时候重新new实例 旧值丢失
  const [, setForceUpdate] = useState(0);
  if (!formRef.current) {
    // 强制组件重新刷新
    const forceUpdateReRender = () => {
      setForceUpdate((prevState) => prevState + 1);
    };
    const formStore = new FormStore(forceUpdateReRender);
    formRef.current = formStore.getForm();
  }
  // 一般来说自定义hooks都以数组形式返回
  // 对象返回需要固定key
  return [formRef.current];
}

export type FormInstanceType = {
  setFieldsValue: (newStore: Store) => void;
  getFieldsValue: () => Store;
  setFieldValue: (name: string, newStore: Store) => void;
  getFieldValue: (name: string) => Store;
  setCallbacks: (data: any) => void;
  submit: () => void;
  setInitialValues: (initValues: Store, mounted?: boolean) => void;
  registerField: (fieldEntity: FieldInstance) => void;
};

export type FieldInstance = {
  name: string;
  rules: Record<any, any>[];
  onStoreChange: () => void;
};
