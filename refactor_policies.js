const fs = require('fs');
const path = require('path');

const apps = ['uk', 'us', 'ca', 'au'];
const policies = [
  'cookies-policy',
  'privacy-policy',
  'refund-policy',
  'return-policy',
  'shipping-policy',
  'terms-of-service'
];

const rootDir = path.join(__dirname, 'apps');

apps.forEach(app => {
  const appDir = path.join(rootDir, app, 'src');
  
  // 1. Move directories
  const appPoliciesDir = path.join(appDir, 'app', 'policies');
  if (!fs.existsSync(appPoliciesDir)) {
    fs.mkdirSync(appPoliciesDir, { recursive: true });
  }

  policies.forEach(policy => {
    const oldPath = path.join(appDir, 'app', policy);
    const newPath = path.join(appPoliciesDir, policy);
    
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Moved ${oldPath} to ${newPath}`);
    }
  });

  // 2. Update files in src/
  function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
      const dirPath = path.join(dir, f);
      const isDirectory = fs.statSync(dirPath).isDirectory();
      if (isDirectory) {
        walkDir(dirPath, callback);
      } else if (f.endsWith('.ts') || f.endsWith('.tsx')) {
        callback(dirPath);
      }
    });
  }

  walkDir(appDir, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    policies.forEach(policy => {
      // Replace "/policy-name" but not "/policies/policy-name"
      // Using regex with negative lookbehind if supported, or simpler replacement:
      // We can look for strings like '"/policy-name"' or "'/policy-name'"
      
      const regexDouble = new RegExp(`"(?<!/policies)/${policy}"`, 'g');
      const regexSingle = new RegExp(`'(?<!/policies)/${policy}'`, 'g');
      // For cases like `href="/policy"`
      // It's safe to just replace "/policy" to "/policies/policy" if we first ensure we don't match "/policies/policy"
      // Wait, negative lookbehind is `(?<!...)`
      // Let's use regex that matches `"/policy-name"` or `'/policy-name'`
      // or `href="/policy-name"`
      // `(?<!/policies)/${policy}` will match `/${policy}` if not preceded by `/policies`.
      // Also we need to make sure we don't match something like `my-privacy-policy` but the exact string.
      
      const pattern1 = new RegExp(`(?<!/policies)/${policy}`, 'g');
      
      if (pattern1.test(content)) {
        content = content.replace(pattern1, `/policies/${policy}`);
        changed = true;
      }
      
      // Also check `path: "/shipping-policy"` and canonicals.
      // Above pattern should catch them all.
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  });
});

console.log("Done.");
