"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { loginAction } from "@/actions/auth";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setFormError(null);

    const result = await loginAction(data);

    if (result.error) {
      setFormError(result.error);
    }

    if (result.success) {
      router.push("/dashboard");
      toast.success("Login successful", {
        description: "You are now logged in",
      });
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      if (result?.error) {
        toast.error("Google sign-in failed");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("An unexpected error occurred during Google sign-in");
    } finally {
      setIsLoading(false);
      toast.success("Login successful");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {formError && <p className="text-sm text-red-600">{formError}</p>}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                Login with Google
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={async () => {
                  await signIn.email({
                    email: "demo@cashflow.app",
                    password: "DemoPassword123!",
                  });
                  toast.success("Logged in as demo user");
                  router.push("/dashboard");
                }}
              >
                Try Demo Account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
