// Configuration helpers. Demo target for ProofPatch: intentionally vulnerable. Never deploy this module.
const fs = require('node:fs');
const path = require('node:path');

/** Deep-merges user settings into the defaults. */
function mergeSettings(target, source) {
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      mergeSettings(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

/** Renders a greeting template such as "Hello ${name}". */
function renderTemplate(template, vars) {
  const render = new Function(...Object.keys(vars), `return \`${template}\`;`);
  return render(...Object.values(vars));
}

/** Loads a named profile from the profiles folder. */
function loadProfile(dir, name) {
  return JSON.parse(fs.readFileSync(path.join(dir, `${name}.json`), 'utf8'));
}

/** Feature flag lookup with a default. */
function flag(settings, name, fallback = false) {
  return settings.flags && name in settings.flags ? settings.flags[name] : fallback;
}

module.exports = { mergeSettings, renderTemplate, loadProfile, flag };
