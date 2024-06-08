import { FieldValues, Resolver, SubmitHandler } from "react-hook-form";

export type TFormConfig = {
  resolver?: Resolver<FieldValues>;
  defaultValues?: Record<string, any>;
};

export type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;
