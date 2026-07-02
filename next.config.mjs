/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats; the optimizer picks the smallest the browser supports.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
