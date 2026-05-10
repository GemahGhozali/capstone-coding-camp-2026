import { Link } from "react-router-dom";
import KeyIcon from "@/assets/icons/KeyIcon";
import MailIcon from "@/assets/icons/MailIcon";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import ErrorDisplay from "../components/ErrorDisplay";
import { useLoginForm } from "../hooks/useLoginForm";
import { useLogin } from "../api/auth.mutations";
import type { LoginFormValues } from "../schemas/login.schema";

export function LoginPage() {
  const { mutate: login, isError, error, isPending } = useLogin();

  const handleSubmit = (data: LoginFormValues) => login({ ...data });

  const { register, errors, onSubmit } = useLoginForm({ submitFn: handleSubmit });

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="flex flex-col items-center mb-10 md:mb-16">
        <Logo variant="icon" className="mb-4" />
        <h3 className="text-center text-h3 font-semibold mb-1">Selamat Datang Kembali 🙌</h3>
        <p className="text-center text-body text-neutral-500">Silahkan masukkan kredensial anda untuk menggunakan aplikasi</p>
      </div>
      <div className="space-y-4 md:space-y-6">
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
          Login dan Gunakan Aplikasi
        </Button>
        <p className="text-body text-neutral-500 text-center">
          Belum memiliki akun sebelumnya?{" "}
          <Link to="/auth/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>

      {isError && <ErrorDisplay error={error} />}
    </form>
  );
}
