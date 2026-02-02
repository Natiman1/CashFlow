import { SignupForm } from "@/components/signup-form"
import { authIsNotRequired } from "@/lib/auth-utils"


export default async function Page() {
  await authIsNotRequired();
  return (
   <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}

