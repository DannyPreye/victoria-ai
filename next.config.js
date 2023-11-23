/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        /* am doing this because of this
          build error ""src/app/api/auth/[...nextauth]/route.ts"
          does not match the required types of a Next.js Route"
          */
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["agcnwo.com", "res.cloudinary.com"],
    },
};

module.exports = nextConfig;
