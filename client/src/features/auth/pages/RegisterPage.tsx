import { Link } from "react-router-dom";
import KeyIcon from "@/assets/icons/KeyIcon";
import MailIcon from "@/assets/icons/MailIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import ErrorDisplay from "../components/ErrorDisplay";
import { useRegister } from "../api/auth.mutations";
import { useRegisterForm } from "../hooks/useRegisterForm";
import type { RegisterFormValues } from "../schemas/register.schema";

export function RegisterPage() {
  const { mutate, isError, error, isPending } = useRegister();

  const handleSubmit = (data: RegisterFormValues) => mutate({ ...data });

  const { register, errors, onSubmit } = useRegisterForm({ submitFn: handleSubmit });

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="flex flex-col items-center mb-10 md:mb-16">
        <Logo variant="icon" className="mb-4" />
        <h3 className="text-center text-h3 font-semibold mb-1">Registrasi Akun Baru</h3>
        <p className="text-center text-body text-neutral-500">Silahkan masukkan kredensial anda untuk membuat akun baru</p>
      </div>
      <div className="space-y-4 md:space-y-6">
        <Input
          type="text"
          label="Username"
          placeholder="Masukkan username anda disini..."
          icon={<ProfileIcon className="text-neutral-500 size-5" />}
          error={errors.username?.message}
          required={false}
          {...register("username")}
        />
        <Input
          type="email"
          label="Alamat Email"
          placeholder="Masukkan email anda disini..."
          icon={<MailIcon className="text-neutral-500 size-5" />}
          error={errors.email?.message}
          required={false}
          {...register("email")}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Masukkan password anda disini..."
          icon={<KeyIcon className="fill-neutral-500 size-5" />}
          error={errors.password?.message}
          required={false}
          {...register("password")}
        />
        <Button type="submit" size="large" className="w-full" disabled={isPending}>
          Buat Akun Baru
        </Button>
        <p className="text-body text-neutral-500 text-center">
          Sudah memiliki akun sebelumnya?{" "}
          <Link to="/auth/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>

      {isError && <ErrorDisplay error={error} />}
    </form>
  );
}
