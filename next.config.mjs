/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/face-exercise-app" : "",
  assetPrefix: isProd ? "/face-exercise-app/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
