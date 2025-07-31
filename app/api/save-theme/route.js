// app/api/save-theme/route.ts
import { updateUserThemePreference } from "@/lib/data-service";
import { auth } from "@/utils/supabase/auth"; // your server-side auth

export async function POST(req) {
  try {
    const session = await auth();

    if (!session?.user?.user_id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { theme } = await req.json();

    await updateUserThemePreference(session.user.user_id, theme);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Save theme error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
