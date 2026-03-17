/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/face-exercise-app",
  assetPrefix: "/face-exercise-app/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
