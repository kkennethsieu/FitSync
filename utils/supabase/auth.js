import {
  createProfile,
  createUser,
  getProfile,
  getUser,
} from "@/lib/data-service";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getUser(user.email);
        const user_id = crypto.randomUUID();

        if (!existingGuest) {
          await createUser({
            user_id,
            email: user.email,
            name: user.name ?? "",
          });
          await createProfile({
            user_id,
            name: user.name ?? "",
            avatar: user.image,
            email: user.email,
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, userr }) {
      const user = await getUser(session.user.email);
      const profile = await getProfile(user.user_id);
      session.user.user_id = user.user_id;
      session.user.theme = profile.theme;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
