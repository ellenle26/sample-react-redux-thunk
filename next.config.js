/** @type {import('next').NextConfig} */
let backendApi = "http://localhost:8080";

switch (process.env.APP_ENV) {
  case 'prd':
    backendApi = "";
    break;
  case 'dev':
    backendApi = "";
    break;
}

module.exports = {
  reactStrictMode: true,
  env: {
    BACKEND_API: backendApi + "/api",
  }
}
