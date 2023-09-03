/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compress: true,
	images: {
		domains: ["uploadthing.com", "utfs.io"],
	},

	publicRuntimeConfig: {
		// remove private variables from processEnv
		processEnv: Object.fromEntries(
			Object.entries(process.env).filter(([key]) => key.includes("NEXT_PUBLIC_"))
		),
	},
};

module.exports = nextConfig;
