const express = require('express');
const passport = require('passport');
const User = require('../models/user.model.js'); // Assuming you have a User model
const router = express.Router();

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Handle Google OAuth Callback
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/check', // Redirect to frontend
  failureRedirect: '/', // Redirect on failure
}), (req, res) => {
  // This handler is optional and won't be triggered due to the redirects above.
  // Any post-auth logic can be handled on the frontend.
  console.log("This won't typically log unless you adjust the callback flow");
});

// Check Login Success
router.get("/login/success", async (req, res) => {
      console.log('Authenticated user:', req.user); // Debug log
  if (req.isAuthenticated()) { // Use isAuthenticated to confirm user is logged in
    // res.status(200).json({
    //   error: false,
    //   message: "Successfully Logged In",
    //   user: {
    //     name: req.user.displayName,
    //     email: req.user.emails[0].value, // Extract the email from Google profile
    //   },
    // });
    const name = req.user.displayName;
        const email = req.user.emails[0].value;
        const profilepic = req.user.photos[0].value;
        console.log("name",profilepic);
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
                profilepic
            });
    
            // Save the user to the database
            await user.save();
    
            // Return the new user's ID
            res.status(201).json({ userId: user._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

module.exports = router;
