/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { withSentryConfig } from "@sentry/nextjs";
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },

  experimental: {
    // Prevent Next from bundling these server-only deps (fixes README.md/LICENSE parse crashes)
    serverComponentsExternalPackages: [
      "@libsql/client",
      "@libsql/hrana-client",
      "libsql",
    ],
  },

  webpack(webpackConfig, { isServer }) {
    const config = webpackConfig;
    // Treat README / LICENSE / .d.ts as raw text so @libsql package docs and types do not break bundling
    config.module?.rules?.push({
      test: /(LICENSE|README|\.md|\.d\.ts)$/i,
      type: "asset/source",
    });

    // Allow .js imports to resolve to .ts when the .js file is not emitted (covers prisma client output in ./prisma)
    config.resolve = config.resolve || {};
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };

    // Skip bundling native .node binaries; leave them to be required at runtime
    config.externals = config.externals || [];
    config.externals.push(
      /**
       * @param {{ request?: string }} context
       * @param {(error?: Error | null, result?: string) => void} callback
       */
      ({ request }, callback) => {
        if (request?.endsWith(".node"))
          return callback(null, "commonjs " + request);
        callback();
      },
    );

    // Keep libsql packages external on the server so requireNative isn’t bundled
    if (isServer) {
      config.externals.push({
        libsql: "commonjs libsql",
        "@libsql/client": "commonjs @libsql/client",
        "@libsql/core": "commonjs @libsql/core",
        "@libsql/hrana-client": "commonjs @libsql/hrana-client",
      });
    }

    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: "patricio-huerta",
  project: "sluglink",
};

const sentryOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

export default withSentryConfig(
  config,
  sentryWebpackPluginOptions,
  sentryOptions,
);
