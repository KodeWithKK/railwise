const esbuild = require("esbuild");
const dotenv = require("dotenv");

// Load .env before build so env vars are embedded
dotenv.config();

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    outfile: "build/index.js",
    sourcemap: true,
    external: ["aws-sdk"], // avoid bundling AWS SDK (preinstalled in Lambda)
  })
  .catch(() => process.exit(1));
