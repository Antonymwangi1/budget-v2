import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#1d2021" }}
    >
      <SignIn />
    </div>
  );
}
