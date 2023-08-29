const User = require('../models/User');  // Make sure the path to your models is correct

const userData = [
    {
        username: 'john_doe',
        password: 'password123'  // Note: In a real scenario, store hashed passwords
    },
    {
        username: 'jane_smith',
        password: 'hashedPassword456'  // Ensure this is hashed
    },
    {
        username: 'alice_wonder',
        password: 'hashedPassword789'  // Ensure this is hashed
    }
];

const seedUsers = async () => {
    await User.bulkCreate(userData);
};

module.exports = seedUsers;