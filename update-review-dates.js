const fs = require('fs');
const path = require('path');

// Get arguments from command line
const args = process.argv.slice(2);
if (args.length < 1 || args.length > 2 || isNaN(parseInt(args[0], 10))) {
  console.error("Usage: node update-review-dates.js <number_of_days> [product_handle]");
  console.error("Examples:");
  console.error("  node update-review-dates.js 1                        (Updates ALL products)");
  console.error("  node update-review-dates.js 1 buudy-led-mask         (Updates ONLY the LED mask)");
  console.error("  node update-review-dates.js 1 buudy-red-torch        (Updates ONLY the Red Torch)");
  process.exit(1);
}

const daysToAdd = parseInt(args[0], 10);
const targetProduct = args[1]; // Optional second argument

const appsDir = path.join(__dirname, 'apps');
const countries = ['us', 'uk', 'ca', 'au'];
let filesToProcess = ['buudy-led-mask-reviews.json', 'buudy-red-torch-reviews.json'];

// If a specific product was provided, filter the files to process
if (targetProduct) {
  const targetFileName = `${targetProduct}-reviews.json`;
  if (!filesToProcess.includes(targetFileName)) {
    console.error(`\nError: Unknown product "${targetProduct}".`);
    console.error(`Available products are: buudy-led-mask, buudy-red-torch\n`);
    process.exit(1);
  }
  filesToProcess = [targetFileName];
  console.log(`Shifting review dates forward by ${daysToAdd} days for ${targetProduct} ONLY...`);
} else {
  console.log(`Shifting review dates forward by ${daysToAdd} days for ALL products...`);
}

let totalUpdated = 0;

countries.forEach(country => {
  const reviewsDir = path.join(appsDir, country, 'src', 'data', 'reviews');
  
  if (!fs.existsSync(reviewsDir)) {
    console.warn(`Directory not found: ${reviewsDir}`);
    return;
  }

  filesToProcess.forEach(fileName => {
    const filePath = path.join(reviewsDir, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const reviews = JSON.parse(fileContent);
        
        let fileUpdatedCount = 0;

        reviews.forEach(review => {
          if (review.date) {
            // Parse the existing date string
            // We parse the first 10 characters (YYYY-MM-DD) as UTC
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
        console.log(`Updated ${fileUpdatedCount} reviews in ${country}/${fileName}`);
        totalUpdated += fileUpdatedCount;
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }
  });
});

console.log(`\nSuccessfully shifted dates forward by ${daysToAdd} days for ${totalUpdated} total reviews.`);
