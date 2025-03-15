/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true, // Ignore TypeScript errors during build
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
    reactStrictMode: true, // Recommended for debugging
    swcMinify: true, // Enable SWC compiler for better performance
  };
  
  export default nextConfig;
  