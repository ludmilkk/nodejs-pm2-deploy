const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env.deploy') });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REPO,
  DEPLOY_PATH,
  DEPLOY_KEY,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-frontend',
      script: 'node_modules/.bin/serve',
      args: '-s build -l 8081',
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: DEPLOY_KEY,
      'post-deploy': 'source ~/.nvm/nvm.sh && cd frontend && npm install && npm install serve && NODE_OPTIONS=--openssl-legacy-provider npm run build && pm2 startOrReload ecosystem.config.js',
    },
  },
};
