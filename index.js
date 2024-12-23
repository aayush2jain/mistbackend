const express = require('express');
const passport = require('passport');
const app = express();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const authrouter = require('./route/auth.js');
const session = require('express-session');
const userRouter = require('./route/user.route.js');
const bodyParser = require('body-parser');
app.use(
  session({
    secret: '1234', // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const connectDb=async()=>{
 try{
        await mongoose.connect(`mongodb+srv://aayushjain1290:evy8RJrHu2GsgXJJ@cluster0.labzo.mongodb.net/misthan`)
         app.listen(process.env.PORT || 4000,()=>{
          console.log(`server is running `);
        })
    }
    catch(error)
    {
      console.log('error in db connection',error)
    }
}
connectDb();
app.get('/',(req,res)=>{
  res.send('hello');
});

app.use('/auth',authrouter);
app.use('/user',userRouter);
passport.use(new GoogleStrategy({
  clientID: '41139617399-5j4u88lmjqaskkgj3nb0tf871gb9folo.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    console.log("Google profile: ", profile);
    done(null, profile); 
}));

// Serialize and deserialize user sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});