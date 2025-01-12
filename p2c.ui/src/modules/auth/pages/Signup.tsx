import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../core/components/html/Input";
import Button from "../../../core/components/html/Button";
import { NewUser, newUserSchema } from "../../../core/types/user";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewUser>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  // const navigate = useNavigate();

  const onLogin = async (newUser: NewUser) => {
    console.log(newUser);
  };

  return (
    <form onSubmit={handleSubmit(onLogin)}>
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
