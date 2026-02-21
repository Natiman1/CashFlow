"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/auth-client";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setFormError(null);

    const { error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: "/dashboard",
    });

    if (error) {
      setFormError(error.message || "Signup failed");
      setIsLoading(false);
      return;
    }

    toast.success("Account created successfully", {
      description: "You are now logged in",
    });
    router.push("/dashboard");
    router.refresh();
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
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder="John Doe"
                required
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password")}
                required
              />

              {errors.password ? (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              ) : (
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirmPassword")}
                required
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {" "}
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
