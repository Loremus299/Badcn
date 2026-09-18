import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";

export default function FormController<
  T extends FieldValues,
  K extends Path<T>,
>({
  form,
  name,
  label,
  description,
  render,
}: {
  form: UseFormReturn<T>;
  name: K;
  label: string;
  description?: string;
  render: (args: {
    fieldState: ControllerFieldState;
    field: ControllerRenderProps<T, K>;
  }) => React.ReactNode;
}) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}
          {render({
            field,
            fieldState,
          })}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
