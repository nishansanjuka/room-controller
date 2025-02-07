import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-zinc-900">
        <div className="relative h-dvh w-full">
          <div className="from-color-2 to-color-5 absolute inset-0 bg-gradient-to-t opacity-50" />
          <Image className=" h-full object-contain" src={'/bg.png'} alt="bg" width={1280} height={768}/>
        </div>
      </div>
      <div className="relative z-20 flex items-center text-lg font-medium">
        <div className="flex items-center gap-[0.018rem] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <div className="flex aspect-square items-center justify-center rounded-xl">
            <House className="size-[3.1rem] group-data-[state=collapsed]:size-8" />
          </div>
          <div className="grid flex-1 text-left text-xl font-bold leading-tight">
            <House className="h-5 w-auto group-data-[state=collapsed]:hidden" />
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
            <p className="text-lg">
            &ldquo;Take control of your space with smart IoT room management. 
            Manage lighting, temperature, and security from anywhere. 
            Join thousands of users creating smarter, more efficient spaces.&rdquo;
            </p>
          {/* <footer className="text-sm">Sofia Davis</footer> */}
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
        {children}
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href={"/legal/terms"}
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={"/legal/privacy"}
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  </div>
);

export default AuthLayout;
