import { createContext } from "react";
import { FormInstanceType } from "@/component/RCForm/useForm";

const FiledContext = createContext<FormInstanceType | null>(null);
export default FiledContext;
