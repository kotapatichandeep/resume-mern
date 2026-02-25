const { verifyToken } = require('@clerk/backend');

const clerkAuth = async (req, res, next) => {
    try {
        const secretKey = process.env.CLERK_SECRET_KEY;

        // Basic check for Secret Key
        if (!secretKey || secretKey === 'your_secret_key_here') {
            console.error('ERROR: Clerk Secret Key is missing or not configured in .env');
            return res.status(500).json({ message: 'Server configuration error: Missing Secret Key' });
        }

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            console.log('Auth failed: No token provided');
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify the token using the top-level verifyToken function
        const sessionClaims = await verifyToken(token, { secretKey });

        if (!sessionClaims) {
            console.log('Auth failed: Invalid token claims');
            return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = {
            id: sessionClaims.sub,
            email: sessionClaims.email,
        };

        next();
    } catch (err) {
        console.error('Clerk Auth Error:', err.message);
        res.status(401).json({ message: `Invalid token: ${err.message}` });
    }
};

module.exports = clerkAuth;

