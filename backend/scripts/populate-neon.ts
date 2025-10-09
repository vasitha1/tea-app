import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.POSTGRES_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('No database connection string found in environment variables');
  process.exit(1);
}

const client = new Client({
  connectionString: connectionString,
});

async function populateDatabase() {
  try {
    await client.connect();
    console.log('Connected to Neon database');

    // Sample products data
    const products = [
      {
        id: '1',
        name: 'Cameroon Highland Tea',
        flavor: 'Earthy and Bold',
        shortDescription: 'Premium highland tea from the mountains of Cameroon',
        longDescription: 'This exceptional tea is grown in the high-altitude regions of Cameroon, where the cool mountain air and rich volcanic soil create the perfect conditions for premium tea cultivation. Each leaf is carefully hand-picked and processed using traditional methods passed down through generations.',
        healthBenefits: [
          'Rich in antioxidants',
          'Supports heart health',
          'Boosts immune system',
          'Natural energy boost'
        ],
        brewingInstructions: [
          'Heat water to 200°F (93°C)',
          'Use 1 teaspoon per 8oz cup',
          'Steep for 3-5 minutes',
          'Enjoy hot or iced'
        ],
        healthDisclaimer: 'This product is not intended to diagnose, treat, cure, or prevent any disease.',
        price: 24.99,
        stock: 50,
        imageUrl: '/images/cameroon-highland.jpg'
      },
      {
        id: '2',
        name: 'Cameroon Green Tea',
        flavor: 'Fresh and Light',
        shortDescription: 'Delicate green tea with a refreshing taste',
        longDescription: 'Our green tea is carefully selected from the finest Cameroonian tea gardens. The leaves are gently processed to preserve their natural antioxidants and delicate flavor profile.',
        healthBenefits: [
          'High in antioxidants',
          'Supports metabolism',
          'Promotes relaxation',
          'Rich in vitamins'
        ],
        brewingInstructions: [
          'Heat water to 175°F (80°C)',
          'Use 1 teaspoon per 8oz cup',
          'Steep for 2-3 minutes',
          'Best enjoyed hot'
        ],
        healthDisclaimer: 'This product is not intended to diagnose, treat, cure, or prevent any disease.',
        price: 19.99,
        stock: 75,
        imageUrl: '/images/cameroon-green.jpg'
      },
      {
        id: '3',
        name: 'Cameroon Black Tea',
        flavor: 'Rich and Full-bodied',
        shortDescription: 'Classic black tea with robust flavor',
        longDescription: 'A traditional black tea that embodies the rich heritage of Cameroonian tea culture. Perfect for morning rituals or afternoon tea time.',
        healthBenefits: [
          'Natural caffeine',
          'Supports focus',
          'Rich in flavonoids',
          'Antioxidant properties'
        ],
        brewingInstructions: [
          'Heat water to 212°F (100°C)',
          'Use 1 teaspoon per 8oz cup',
          'Steep for 4-5 minutes',
          'Add milk or lemon if desired'
        ],
        healthDisclaimer: 'This product is not intended to diagnose, treat, cure, or prevent any disease.',
        price: 22.99,
        stock: 60,
        imageUrl: '/images/cameroon-black.jpg'
      }
    ];

    // Sample reviews data
    const reviews = [
      {
        id: '1',
        rating: 5,
        comment: 'Absolutely amazing tea! The flavor is incredible and it arrived quickly.',
        country: 'United States',
        guestName: 'Sarah Johnson',
        guestEmail: 'sarah.j@email.com',
        productId: '1'
      },
      {
        id: '2',
        rating: 4,
        comment: 'Great quality tea, very satisfied with my purchase.',
        country: 'Canada',
        guestName: 'Michael Chen',
        guestEmail: 'm.chen@email.com',
        productId: '1'
      },
      {
        id: '3',
        rating: 5,
        comment: 'Perfect for my morning routine. Highly recommend!',
        country: 'United Kingdom',
        guestName: 'Emma Wilson',
        guestEmail: 'emma.w@email.com',
        productId: '2'
      },
      {
        id: '4',
        rating: 4,
        comment: 'Good tea, nice packaging. Will order again.',
        country: 'Germany',
        guestName: 'Hans Mueller',
        guestEmail: 'hans.m@email.com',
        productId: '2'
      },
      {
        id: '5',
        rating: 5,
        comment: 'Excellent black tea with rich flavor. Love it!',
        country: 'France',
        guestName: 'Marie Dubois',
        guestEmail: 'marie.d@email.com',
        productId: '3'
      }
    ];

    // Insert products
    console.log('Inserting products...');
    for (const product of products) {
      await client.query(`
        INSERT INTO product (id, name, flavor, "shortDescription", "longDescription", "healthBenefits", "brewingInstructions", "healthDisclaimer", price, stock, "imageUrl", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
      `, [
        product.id,
        product.name,
        product.flavor,
        product.shortDescription,
        product.longDescription,
        JSON.stringify(product.healthBenefits),
        JSON.stringify(product.brewingInstructions),
        product.healthDisclaimer,
        product.price,
        product.stock,
        product.imageUrl
      ]);
    }

    // Insert reviews
    console.log('Inserting reviews...');
    for (const review of reviews) {
      await client.query(`
        INSERT INTO review (id, rating, comment, country, "guestName", "guestEmail", "productId", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
      `, [
        review.id,
        review.rating,
        review.comment,
        review.country,
        review.guestName,
        review.guestEmail,
        review.productId
      ]);
    }

    console.log('✅ Database populated successfully!');
    console.log(`Inserted ${products.length} products and ${reviews.length} reviews`);

  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

populateDatabase();

