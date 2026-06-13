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

  // 1. Logo
  content = content.replace(
    /src=\{productMediaAsset\("59 \(2\)\.png"\)\}\s*alt="Dr Dennis Gross"/,
    'src={productMediaAsset("shark_logo.png")}\n                      alt="Shark"'
  );

  // 2. Mask Image
  content = content.replace(
    /src=\{productMediaAsset\("Dr Dennis Gross\.png"\)\}\s*alt="Dr Dennis Gross Mask"/,
    'src={productMediaAsset("shark.png")}\n                      alt="Shark Mask"'
  );

  // 3. Features
  // Portable
  content = content.replace(
    /(title="Portable"[\s\S]*?<CheckIcon key="1" \/>, <CheckIcon key="2" \/>, <CrossIcon key="3" \/>, )<CheckIcon key="4" \/>/,
    '$1<CrossIcon key="4" />'
  );

  // Infrared
  content = content.replace(
    /(colorName="Infrared"[\s\S]*?<CheckIcon key="1" \/>, <CheckIcon key="2" \/>, <CheckIcon key="3" \/>, )<CheckIcon key="4" \/>/,
    '$1<CrossIcon key="4" />'
  );

  // Eye Protection
  content = content.replace(
    /(title="Eye Protection"[\s\S]*?<CheckIcon key="1" \/>, <CrossIcon key="2" \/>, <CrossIcon key="3" \/>, )<CheckIcon key="4" \/>/,
    '$1<CrossIcon key="4" />'
  );

  // Customizable treatments
  content = content.replace(
    /(title="Customizable treatments"[\s\S]*?<CheckIcon key="1" \/>, <CrossIcon key="2" \/>, <CrossIcon key="3" \/>, )<CheckIcon key="4" \/>/,
    '$1<CrossIcon key="4" />'
  );

  // App companion
  content = content.replace(
    /(title="App companion"[\s\S]*?<CheckIcon key="1" \/>, <CrossIcon key="2" \/>, <CrossIcon key="3" \/>, )<CheckIcon key="4" \/>/,
    '$1<CrossIcon key="4" />'
  );

  // Treatment Time
  content = content.replace(
    /(<strong key="4" className="buudy-display font-bold text-sm md:text-base text-\[var\(--muted\)]">)3 MINS(<\/strong>)/g,
    '$110 MINS$2'
  );

  // Prices
  if (file.includes('/uk/')) {
    content = content.replace(
      /(<span key="4" className="buudy-display text-base md:text-lg text-\[var\(--muted\)]">)£455(<\/span>)/,
      '$1£299$2'
    );
  } else if (file.includes('/us/')) {
    content = content.replace(
      /(<span key="4" className="buudy-display text-base md:text-lg text-\[var\(--muted\)]">)\$455(<\/span>)/,
      '$1$299$2'
    );
  } else if (file.includes('/ca/')) {
    content = content.replace(
      /(<span key="4" className="buudy-display text-base md:text-lg text-\[var\(--muted\)]">)\$555(<\/span>)/,
      '$1$399$2'
    );
  } else if (file.includes('/au/')) {
    content = content.replace(
      /(<span key="4" className="buudy-display text-base md:text-lg text-\[var\(--muted\)]">)AU\$555(<\/span>)/,
      '$1AU$399$2'
    );
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
