import { SignIn } from "@clerk/nextjs";

const title = "Welcome back";
const description = "Enter your details to sign in.";

const SignInPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <SignIn
      appearance={{
        elements: {
          header: "hidden",
        },
      }}
    />
  </>
);

export default SignInPage;
