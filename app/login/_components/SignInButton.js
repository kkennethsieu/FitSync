import { signInAction } from "@/lib/actions";
import Image from "next/image";

export default function SignInButton({
  children = "Sign in with Google",
  src,
  provider,
}) {
  return (
    <form action={signInAction}>
      <input type="hidden" name="provider" value={provider} />
      <button
        type="submit"
        className="flex items-center w-full gap-3 px-6 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 disabled:opacity-60"
      >
        <Image src={src} alt={provider} width={20} height={20} />
        {children}
      </button>
    </form>
  );
}
