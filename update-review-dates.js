const fs = require('fs');
const path = require('path');

// Get arguments from command line
const args = process.argv.slice(2);
if (args.length < 1 || args.length > 2 || isNaN(parseInt(args[0], 10))) {
  console.error("Usage: node update-review-dates.js <number_of_days> [product_handle]");
  console.error("Examples:");
  console.error("  node update-review-dates.js 5                        (Updates ALL products)");
  console.error("  node update-review-dates.js 5 buudy-led-mask         (Updates ONLY the LED mask)");
  console.error("  node update-review-dates.js 5 buudy-red-torch        (Updates ONLY the Red Torch)");
  process.exit(1);
}

const daysToAdd = parseInt(args[0], 10);
const targetProduct = args[1]; // Optional second argument

const rootDir = __dirname;
const appsDir = path.join(rootDir, 'apps');
const countries = ['us', 'uk', 'ca', 'au'];

if (targetProduct) {
  console.log(`Shifting review dates forward by ${daysToAdd} days for ${targetProduct} ONLY across all countries...`);
} else {
  console.log(`Shifting review dates forward by ${daysToAdd} days for ALL products across all countries...`);
}

let totalUpdated = 0;
let totalFiles = 0;

countries.forEach(country => {
  const reviewsDir = path.join(appsDir, country, 'src', 'data', 'reviews');
  
  if (!fs.existsSync(reviewsDir)) {
    console.warn(`Directory not found: ${reviewsDir}`);
    return;
  }

  const files = fs.readdirSync(reviewsDir).filter(f => f.endsWith('.json'));

  files.forEach(fileName => {
    if (targetProduct) {
      const expectedFileName = `${targetProduct}-reviews.json`;
      if (fileName !== expectedFileName && fileName !== targetProduct) {
        return;
      }
    }

    const filePath = path.join(reviewsDir, fileName);
    
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const reviews = JSON.parse(fileContent);
      
      let fileUpdatedCount = 0;

      reviews.forEach(review => {
        if (review.date) {
          // Parse the existing date string (YYYY-MM-DD)
          const dateStr = review.date.substring(0, 10);
          const dateObj = new Date(`${dateStr}T00:00:00.000Z`);
          
          if (!isNaN(dateObj.getTime())) {
            // Add days
            dateObj.setUTCDate(dateObj.getUTCDate() + daysToAdd);
            
            const yyyy = dateObj.getUTCFullYear();
            const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const dd = String(dateObj.getUTCDate()).padStart(2, '0');
            
            const newDateStr = `${yyyy}-${mm}-${dd}`;
            
            // Maintain the original format
            review.date = `${newDateStr} 00:00:00 +0000 UTC`;
            review.displayDate = newDateStr;
            fileUpdatedCount++;
          }
        }
      });
      
      // Write the changes back to the file with standard formatting
      fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2) + '\n', 'utf8');
      console.log(`Updated ${fileUpdatedCount} reviews in apps/${country}/src/data/reviews/${fileName}`);
      totalUpdated += fileUpdatedCount;
      totalFiles++;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  });
});

console.log(`\nSuccessfully shifted dates forward by ${daysToAdd} days for ${totalUpdated} total reviews across ${totalFiles} files.`);

