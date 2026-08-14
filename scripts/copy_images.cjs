const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\docs_images';
const destDir = path.join(__dirname, '..', 'public', 'docs_images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png')).sort();

files.forEach((f, idx) => {
  const pageNum = 142 + idx;
  const srcPath = path.join(srcDir, f);
  const destPath = path.join(destDir, `page_${pageNum}.png`);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${f} -> page_${pageNum}.png`);
});

console.log('All 23 images mapped and copied to public/docs_images!');
