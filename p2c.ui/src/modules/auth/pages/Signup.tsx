import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../core/components/html/Input";
import Button from "../../../core/components/html/Button";
import { NewUser, newUserSchema } from "../../../core/types/user";
import { useBoundStore } from "../../../core/stores/useBoundStore";
import { useEffect } from "react";

export default function Signup() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewUser>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { register: registerUser, currentUser } = useBoundStore();

  const onRegister = async (newUser: NewUser) => {
    const res = await registerUser(newUser);

    if (res?.status) {
      navigate("/chats");
    } else {
      const errors: { [key: string]: string } =
        (res?.data as { [key: string]: string }) || {};

      if (errors) {
        Object.keys(errors).forEach((field) => {
          if (errors[field]) {
            setError(field as keyof NewUser, {
              type: "manual",
              message: errors[field],
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    if (currentUser != null) {
      navigate("/chats");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <Input
        suppressHydrationWarning
        placeholder="Name"
        isRequired
        {...register("name")}
        error={errors?.name?.message}
      />

      <Input
        suppressHydrationWarning
        placeholder="Email"
        isRequired
        {...register("email")}
        error={errors?.email?.message}
      />

      <Input
        suppressHydrationWarning
        placeholder="Phone Number"
        isRequired
        isNumberOnly
        {...register("phoneNumber")}
        error={errors?.phoneNumber?.message}
      />

      <Button disabled={!isValid} type="submit" className="!my-5 w-full">
        {isSubmitting ? "Submitting..." : "Sign up"}
      </Button>

      <div className="text-center">
        <Link to="/login" className="group text-sm">
          <span className="text-gray-500">Already registered? </span>
          <span className="underline group-hover:text-black">Log in.</span>
        </Link>
      </div>
    </form>
  );
}
