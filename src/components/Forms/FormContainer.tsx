import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  Resolver,
} from "react-hook-form";

type TFormConfig = {
  resolver?: Resolver<FieldValues>;
  defaultValues?: Record<string, unknown>;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const FormContainer = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig.resolver = resolver as Resolver<FieldValues>;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default FormContainer;
