import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  /* config options here */
  images: {
    remotePatterns: [
      {hostname: "upload.wikimedia.org"}
    ]
  }
};

const withMDX = createMDX({
  // Add markdown plugins here if you want (e.g., remark-gfm)
});

// Wrap your config with MDX support
export default withMDX(nextConfig);
