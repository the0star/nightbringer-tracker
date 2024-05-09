/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karasu-os.com",
      },
      {
        protocol: "https",
        hostname: "obeyme.fandom.com",
        pathname: "/wiki/Special:Redirect/file/**",
      },
      {
        protocol: "https",
        hostname: "obeymewiki.com",
        pathname: "/wiki/Special:Redirect/file/**",
      },
    ],
  },
};

export default nextConfig;
