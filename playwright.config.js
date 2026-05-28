export default {
  testDir: "tests",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    channel: "msedge"
  },
  webServer: {
    command: "npm run preview -- --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120000
  }
};
