"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("./entities/user.entity");
async function createAdmin() {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USER || 'earthlixir_user',
        password: process.env.DATABASE_PASSWORD || 'your_secure_password',
        database: process.env.DATABASE_NAME || 'earthlixir_db',
        entities: [user_entity_1.User],
        synchronize: false,
    });
    try {
        await dataSource.initialize();
        console.log('Database connection established');
        const userRepository = dataSource.getRepository(user_entity_1.User);
        const adminEmail = 'admin@earthlixir.com';
        const adminPassword = 'Admin@123';
        const adminFirstName = 'Admin';
        const adminLastName = 'User';
        const existingAdmin = await userRepository.findOne({ where: { email: adminEmail } });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log(`Email: ${adminEmail}`);
            if (!existingAdmin.isAdmin) {
                existingAdmin.isAdmin = true;
                await userRepository.save(existingAdmin);
                console.log('Updated existing user to admin status');
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
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
    }
    catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
}
createAdmin();
//# sourceMappingURL=create-admin.js.map