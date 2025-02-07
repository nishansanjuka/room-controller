import { SignUp } from "@clerk/nextjs";

const title = "Create an account";
const description = "Enter your details to get started.";

const SignUpPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center mb-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <SignUp
      appearance={{
        elements: {
          header: "hidden",
        },
      }}
    />
  </>
);

export default SignUpPage;
