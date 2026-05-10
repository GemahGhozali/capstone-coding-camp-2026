import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

interface UseLoginFormProps {
  submitFn: (data: LoginFormValues) => void;
}

export function useLoginForm({ submitFn }: UseLoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { register, errors, onSubmit: handleSubmit(submitFn) };
}
