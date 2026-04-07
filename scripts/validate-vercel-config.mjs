import fs from 'node:fs';

const requiredConfig = {
  experimentalServices: {
    frontend: {
      entrypoint: 'frontend',
      routePrefix: '/',
      framework: 'vite',
    },
    backend: {
      entrypoint: 'backend',
      routePrefix: '/_/backend',
    },
  },
};

const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exit(1);
};

const path = 'vercel.json';
if (!fs.existsSync(path)) {
  fail('vercel.json is missing at repository root.');
}

let parsed;
try {
  parsed = JSON.parse(fs.readFileSync(path, 'utf8'));
} catch (error) {
  fail(`vercel.json is invalid JSON: ${error.message}`);
}

const services = parsed.experimentalServices;
if (!services || typeof services !== 'object') {
  fail('vercel.json must contain an "experimentalServices" object.');
}

const frontend = services.frontend;
if (!frontend) {
  fail('experimentalServices.frontend is required.');
}

if (frontend.entrypoint !== requiredConfig.experimentalServices.frontend.entrypoint) {
  fail(`frontend.entrypoint must be "${requiredConfig.experimentalServices.frontend.entrypoint}".`);
}

if (frontend.routePrefix !== requiredConfig.experimentalServices.frontend.routePrefix) {
  fail(`frontend.routePrefix must be "${requiredConfig.experimentalServices.frontend.routePrefix}".`);
}

if (frontend.framework !== requiredConfig.experimentalServices.frontend.framework) {
  fail(`frontend.framework must be "${requiredConfig.experimentalServices.frontend.framework}".`);
}

const backend = services.backend;
if (!backend) {
  fail('experimentalServices.backend is required.');
}

if (backend.entrypoint !== requiredConfig.experimentalServices.backend.entrypoint) {
  fail(`backend.entrypoint must be "${requiredConfig.experimentalServices.backend.entrypoint}".`);
}

if (backend.routePrefix !== requiredConfig.experimentalServices.backend.routePrefix) {
  fail(`backend.routePrefix must be "${requiredConfig.experimentalServices.backend.routePrefix}".`);
}

console.log('✅ vercel.json configuration is valid for multi-service deployment.');
