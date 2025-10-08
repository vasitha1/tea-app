const fs = require('fs');
const path = require('path');

const files = [
  'src/app/admin/categories/page.tsx',
  'src/app/admin/faqs/page.tsx',
  'src/app/admin/orders/page.tsx',
  'src/app/admin/products/page.tsx',
  'src/app/admin/reviews/page.tsx',
  'src/app/admin/users/page.tsx',
  'src/app/admin/login/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace err: any with proper typing
  content = content.replace(/catch \(err: any\)/g, 'catch (err)');
  content = content.replace(
    /const errorMessage = err\.response\?\.data\?\.message/g,
    'const error = err as { response?: { data?: { message?: string } } };\n      const errorMessage = error.response?.data?.message'
  );
  
  // Remove unused error variable declarations
  content = content.replace(/const \[error, setError\] = useState<string \| null>\(null\);/g, 
    'const [, setError] = useState<string | null>(null);');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('All files fixed!');

