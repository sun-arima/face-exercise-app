/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/face-exercise-app" : "",
  assetPrefix: isProd ? "/face-exercise-app/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/face-exercise-app" : "",
  },
};

export default nextConfig;
