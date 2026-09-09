import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import FormController from "../formController";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  input: z
    .string()
    .refine((item) => item === "input", "I SAID TYPE 'input' YOU IDIOT"),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = () => {
    window.alert("Good Job :3 you typed input");
  };

  return (
    <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
      <FormController
        form={form}
        name="input"
        label="Type Input :3"
        placeholder="Type 'input'"
        render={({ field, fieldState, placeholder }) => (
          <Input
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
      <Button type="submit">I typed</Button>
    </form>
  );
}
