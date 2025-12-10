import { useEffect, useMemo } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/service/auth.service";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const defaultValues = useMemo(() => {
    return {
      username: "",
      email: "",
      password: "",
    };
  }, []);

  const { isLogin, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const schemaValidation = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });
  const form = useForm<yup.InferType<typeof schemaValidation>>({
    resolver: yupResolver(schemaValidation),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginService,
    onSuccess: (res) => {
      toast.success("Login Success");
      login(res);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError : (err : any) => {
      toast.error(err?.response?.data?.message || "Something went wrong !")
    }
  });

  const onSubmit = (data: yup.InferType<typeof schemaValidation>) => {
    mutate(data);
  };

  return (
    <div className="w-full h-dvh bg-gray-100 overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-xl rounded-xl bg-white shadow p-10">
        <h1 className="text-2xl font-semibold text-center pb-8">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Loading ..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
