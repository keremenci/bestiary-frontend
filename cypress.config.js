const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  hosts: { localhost: '127.0.0.1' },
});
