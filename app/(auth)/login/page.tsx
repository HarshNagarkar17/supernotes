import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BarChart2 } from "lucide-react";
import { UserAuthForm } from "@/components/forms/user-auth-form";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex h-screen">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-background">
        <div className="w-[350px] space-y-6">
          <BarChart2 className="h-8 w-8 mx-auto text-blue-500" />

          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Welcome, Anon !
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            sign in to your account
          </p>
          <UserAuthForm />
        </div>
      </div>

      <div className="w-1/2 hidden md:block bg-gray-100 dark:bg-gray-800">
        <Image
          alt="Abstract background"
          className="h-full w-full object-cover"
          height="1080"
          src="/placeholder.svg?height=1080&width=1920"
          style={{
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
          width="1920"
        />
      </div>
    </div>
  );
}
