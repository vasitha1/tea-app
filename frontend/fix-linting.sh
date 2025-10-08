#!/bin/bash
# Fix all linting errors

# Fix apostrophes in about page
sed -i "s/Cameroon's/Cameroon\&apos;s/g" src/app/about/page.tsx
sed -i "s/Earth's/Earth\&apos;s/g" src/app/about/page.tsx

# Fix apostrophes in contact page  
sed -i "s/We're/We\&apos;re/g" src/app/contact/page.tsx
sed -i "s/you're/you\&apos;re/g" src/app/contact/page.tsx
sed -i "s/Can't/Can\&apos;t/g" src/app/contact/page.tsx
sed -i "s/don't/don\&apos;t/g" src/app/contact/page.tsx

echo "Apostrophes fixed"
