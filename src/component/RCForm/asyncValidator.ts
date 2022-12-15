import { Store } from "@/component/RCForm/Form";

class Schema {
  private descriptor;

  constructor(descriptor: Record<any, any>) {
    this.descriptor = descriptor;
  }

  validate(values: Store) {
    return new Promise((resolve, reject) => {
      const errorFields: { name: string; errors: string[] }[] = [];
      Object.keys(this.descriptor).forEach((key) => {
        const value = values[key];
        const rules = this.descriptor[key];
        const ruleKeys = Object.keys(rules);
        const errors: string[] = [];
        ruleKeys.forEach((item) => {
          switch (item) {
            case "required":
              if (rules[item] && !value) {
                errors.push(`${key} is required`);
              }
              break;
            case "min":
              if ((value ?? "").length < rules[item]) {
                errors.push(`${key} is less than ${rules[item]}`);
              }
              break;
            case "max":
              if (value.length > rules[item]) {
                errors.push(`${key} is max than ${rules[item]}`);
              }
              break;
            default:
              break;
          }
        });
        if (errors.length > 0) {
          errorFields.push({ name: key, errors });
        }
      });
      if (errorFields.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ errorFields });
      } else {
        resolve(values);
      }
    });
  }
}

export default Schema;
