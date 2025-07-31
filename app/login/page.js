import SignInButton from "./_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 transition bg-white rounded-2xl ">
      <h1 className="mb-2 text-3xl font-bold text-center text-gray-800">
        Welcome Back
      </h1>
      <p className="mb-6 text-sm text-center text-gray-500">
        Sign in to access your dashboard
      </p>
      <div className="space-y-3">
        <SignInButton
          src="https://developers.google.com/identity/images/g-logo.png"
          provider="google"
        >
          Sign in with Google
        </SignInButton>
        <SignInButton
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          provider="github"
        >
          Sign in with Github
        </SignInButton>
      </div>
    </div>
  );
}
