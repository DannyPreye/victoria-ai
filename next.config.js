/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["agcnwo.com", "res.cloudinary.com"],
    },
};

module.exports = nextConfig;
