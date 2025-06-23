const { cleanEnv, str, port } = require('envalid');

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 5000 }),
    MONGO_URI: str(),
    JWT_SECRET: str(),
    OPENAI_API_KEY: str(),
    // Add other required env vars here
  });
}

module.exports = validateEnv;