import { auth } from "@/utils/supabase/auth";

export const middleware = auth;

export const config = {
  matcher: ["/((?!api/auth|_next|.*\\..*).*)"],
};
