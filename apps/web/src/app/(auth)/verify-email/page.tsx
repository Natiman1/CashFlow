import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerifyEmailPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;
  const email = typeof params.email === "string" ? params.email : "";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-blue-100 p-3">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-muted-foreground">
              We&apos;ve sent a verification link to{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              If you don&apos;t see the email, please check your spam folder.
            </p>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Link href="/login">
              <Button className="w-full">Back to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
