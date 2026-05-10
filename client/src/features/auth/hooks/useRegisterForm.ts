import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../schemas/register.schema";

interface UseRegisterFormProps {
  submitFn: (data: RegisterFormValues) => void;
}

export function useRegisterForm({ submitFn }: UseRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return { register, errors, onSubmit: handleSubmit(submitFn) };
}
