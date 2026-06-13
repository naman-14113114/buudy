const fs = require('fs');

const files = [
  'e:/1st YEAR DTU/New folder/Buudy-Vercel/apps/uk/src/components/product/ComparisonTable.tsx',
  'e:/1st YEAR DTU/New folder/Buudy-Vercel/apps/us/src/components/product/ComparisonTable.tsx',
  'e:/1st YEAR DTU/New folder/Buudy-Vercel/apps/ca/src/components/product/ComparisonTable.tsx',
  'e:/1st YEAR DTU/New folder/Buudy-Vercel/apps/au/src/components/product/ComparisonTable.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  
  let content = fs.readFileSync(file, 'utf8');

  // We want to replace the 4th key from CrossIcon to CheckIcon for Eye Protection
  content = content.replace(
    /(title="Eye Protection"[\s\S]*?<CheckIcon key="1" \/>, <CrossIcon key="2" \/>, <CrossIcon key="3" \/>, )<CrossIcon key="4" \/>/,
    '$1<CheckIcon key="4" />'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated Eye Protection in ${file}`);
}
