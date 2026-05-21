



/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            { hostname: "i.pravatar.cc" },
            { hostname: "i.ibb.co" }, // for your real doctor images later
        ],
    },
};

export default nextConfig;
