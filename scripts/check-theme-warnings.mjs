import { readFileSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const baselinePath = resolve(root, 'config/theme-check-baseline.json');
const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(
  npx,
  [
    '--yes',
    `@shopify/cli@${baseline.shopifyCliVersion}`,
    'theme',
    'check',
    '--output',
    'json',
    '--no-color',
    '--path',
    root,
  ],
  { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
);

if (result.error) {
  throw result.error;
}

let reports;
try {
  reports = JSON.parse(result.stdout);
} catch {
  process.stderr.write(result.stderr);
  process.stderr.write(result.stdout);
  throw new Error(`Theme Check did not return JSON (exit ${result.status}).`);
}

const keyFor = ({ severity, path, check, message }) =>
  JSON.stringify([severity, path, check, message]);

const current = new Map();
for (const report of reports) {
  const path = relative(root, report.path).split(sep).join('/');

  for (const offense of report.offenses) {
    if (offense.severity !== 'error' && offense.severity !== 'warning') continue;

    const item = {
      severity: offense.severity,
      path,
      check: offense.check,
      message: offense.message,
    };
    const key = keyFor(item);
    const existing = current.get(key) ?? { ...item, count: 0 };
    existing.count += 1;
    current.set(key, existing);
  }
}

const allowed = new Map(
  baseline.offenses.map((offense) => [keyFor(offense), offense.count])
);
const regressions = [];
let currentCount = 0;

for (const [key, offense] of current) {
  currentCount += offense.count;
  const added = offense.count - (allowed.get(key) ?? 0);
  if (added > 0) regressions.push({ ...offense, count: added });
}

if (regressions.length > 0) {
  console.error('New Theme Check warnings or errors:');
  for (const offense of regressions) {
    console.error(
      `${offense.path}: ${offense.severity} ${offense.check} (${offense.count} new)\n  ${offense.message}`
    );
  }
  process.exit(1);
}

console.log(
  `Theme Check passed: ${currentCount} warning/error offenses, all within the ${baseline.offenseCount}-offense baseline.`
);
