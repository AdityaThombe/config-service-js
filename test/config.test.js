const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { mergeSettings, renderTemplate, loadProfile, flag } = require('../src/config.js');

test('merges nested settings', () => {
  const merged = mergeSettings({ theme: { color: 'blue', size: 1 } }, { theme: { size: 2 } });
  expect(merged).toEqual({ theme: { color: 'blue', size: 2 } });
});

test('renders a template', () => {
  expect(renderTemplate('Hello ${name}', { name: 'Ada' })).toBe('Hello Ada');
});

test('loads a profile', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'profiles-'));
  fs.writeFileSync(path.join(dir, 'dark.json'), JSON.stringify({ theme: 'dark' }));
  expect(loadProfile(dir, 'dark')).toEqual({ theme: 'dark' });
});

test('feature flags fall back to a default', () => {
  expect(flag({ flags: { beta: true } }, 'beta')).toBe(true);
  expect(flag({}, 'beta')).toBe(false);
});
