import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const metaFile = path.join(publicDir, 'build_meta.json');

// Get Git Info
let commit = 'unknown';
let branch = 'unknown';

try {
    commit = execSync('git rev-parse --short HEAD').toString().trim();
    branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
} catch (e) {
    console.warn('Could not retrieve git info');
}

const meta = {
    commit,
    branch,
    timestamp: new Date().toISOString()
};

// Ensure public dir exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));

console.log('✅ Build Stamp generated:', meta);
