import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../core/components/html/Input";
import Button from "../../../core/components/html/Button";
import { AuthData, authDataSchema } from "../../../core/types/user";
import { useBoundStore } from "../../../core/stores/useBoundStore";
import { useEffect } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AuthData>({
    resolver: zodResolver(authDataSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { login, reset } = useBoundStore();

  const navigate = useNavigate();

  const onLogin = async (authData: AuthData) => {
    const res = await login(authData);

    if (res?.status) {
      navigate("/chats");
    } else {
      const errors: { [key: string]: string } =
        (res?.data as { [key: string]: string }) || {};

      if (errors) {
        Object.keys(errors).forEach((field) => {
          if (errors[field]) {
            setError(field as keyof AuthData, {
              type: "manual",
              message: errors[field],
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Input
        suppressHydrationWarning
        placeholder="Email"
        isRequired
        {...register("email")}
        error={errors?.email?.message}
      />

      <Button disabled={!isValid} type="submit" className="!my-5 w-full">
        {isSubmitting ? "Submitting..." : "Log in"}
      </Button>

      <div className="text-center">
        <Link to="/signup" className="group text-sm">
          <span className="text-gray-500">Not registered? </span>
          <span className="underline group-hover:text-black">Sign up.</span>
        </Link>
      </div>
    </form>
  );
}
