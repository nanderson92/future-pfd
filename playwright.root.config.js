export default {
  testDir: "tests",
  testMatch: "root-static.spec.js",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4180",
    channel: "msedge"
  },
  webServer: {
    command: "node scripts/static-root-server.mjs",
    url: "http://127.0.0.1:4180",
    reuseExistingServer: true,
    timeout: 120000
  }
};
