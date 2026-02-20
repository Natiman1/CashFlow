"use client";

import { updateProfile } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/auth-client"; // Assuming client-side auth hook exists or will use getSession from server action in parent
import { useState } from "react";
import { toast } from "sonner";

export function ProfileForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (session?.user.email === "demo@cashflow.app") {
      toast.error("Demo account is read-only");
      return;
    }

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    const result = await updateProfile({ name });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully");
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={session?.user?.name || ""}
              disabled={session?.user.email === "demo@cashflow.app"}
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              defaultValue={session?.user?.email || ""}
              disabled
              className="bg-muted"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
