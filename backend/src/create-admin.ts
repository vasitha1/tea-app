import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

async function createAdmin() {
  // Create connection to database
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'earthlixir_user',
    password: process.env.DATABASE_PASSWORD || 'your_secure_password',
    database: process.env.DATABASE_NAME || 'earthlixir_db',
    entities: [User],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection established');

    const userRepository = dataSource.getRepository(User);

    // Admin credentials
    const adminEmail = 'admin@earthlixir.com';
    const adminPassword = 'Admin@123'; // Change this to your desired password
    const adminFirstName = 'Admin';
    const adminLastName = 'User';

    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({ where: { email: adminEmail } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log(`Email: ${adminEmail}`);
      
      // Optionally update to admin if not already
      if (!existingAdmin.isAdmin) {
        existingAdmin.isAdmin = true;
        await userRepository.save(existingAdmin);
        console.log('Updated existing user to admin status');
      }
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      // Create admin user
      const admin = userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        firstName: adminFirstName,
        lastName: adminLastName,
        isAdmin: true,
      });

      await userRepository.save(admin);
      console.log('✅ Admin user created successfully!');
      console.log('-----------------------------------');
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
      console.log('-----------------------------------');
      console.log('⚠️  Please change the password after first login!');
    }

    await dataSource.destroy();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();


