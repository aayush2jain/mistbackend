const User = require('../models/user.model.js'); // Assuming you have a User model

async function registerUser(req, res) {
    // const url = `http://localhost:4000/auth/login/success`;
	// 		const response = await axios.get(url, { withCredentials: true });
	// 		console.log("helo",response.data);
    // Extract user details from request body
    
    const { name } = req.user.displayName;
    const { email } = req.user.emails[0].value;
    const { profilePic } = req.user.photos[0].value;
    console.log("name",name);
    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            // User already exists, return user ID
            return res.status(200).json({ userId: user._id });
        }

        // Create a new user
        user = new User({
            name,
            email,
            profilePic
        });

        // Save the user to the database
        await user.save();

        // Return the new user's ID
        res.status(201).json({ userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerUser };