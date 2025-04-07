"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/server/users";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export default function Header({ session }: { session: any }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/upload", label: "Upload" },
    { href: "/account", label: "Account" },
  ];
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
  const commonClass =
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50";
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 lg:flex" prefetch={false}>
          <h1 className="text-2xl font-bold">Artifacts</h1>
        </Link>
        <div className="ml-auto flex gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={commonClass} prefetch={false}>
              {link.label}
            </Link>
          ))}
          {session?.user ? (
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSignIn}
                variant="outline"
                className="justify-self-end"
              >
                Sign in
              </Button>
              <Button onClick={handleSignUp} className="justify-self-end">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
