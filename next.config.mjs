/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["storage.googleapis.com"], //make it 'your-domain.com'
  },
};

export default nextConfig;
