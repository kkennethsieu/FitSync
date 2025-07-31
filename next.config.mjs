/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "developers.google.com",
        pathname: "/identity/images/g-logo.png",
      },
      {
        protocol: "https",
        hostname: "xavxvjcuuhbclzpvqfwb.supabase.co",
        pathname: "/storage/v1/object/public/exercise-img/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
