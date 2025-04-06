"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/server/users";
import { submitArtifact } from "@/server/submitArtifact";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function FormClient({ session }: { session: any }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const handleSignIn = async () => {
    await signIn("test@test.com", "test");
    router.refresh();
  };

  const handleSignUp = async () => {
    await signUp("test@test.com", "test", "test");
    router.refresh();
  };

  return (
    <>
      {session?.user ? (
        <Button onClick={handleSignOut}>Sign Out</Button>
      ) : (
        <>
          <h1>Sign In</h1>
          <Button onClick={handleSignIn}>Sign In</Button>
          <Button onClick={handleSignUp}>Sign Up</Button>
        </>
      )}

      <form action={submitArtifact}>
        <Input
          type="text"
          name="title"
          defaultValue="test"
          placeholder="title"
        />
        <Input
          type="text"
          name="description"
          defaultValue="test"
          placeholder="description"
        />
        <Input type="text" name="url" defaultValue="test" placeholder="url" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
