import passport from "passport";
import fbStrategy from "passport-facebook";
import { userService } from "./services/services.js";

const FacebookStrategy = fbStrategy.Strategy;

const initializePassportConfig = () => {
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: "721247842594027",
        clientSecret: "a327fb0463fb2ec2c75c065376b01108",
        callbackURL:
          "https://5d46-190-236-87-152.ngrok.io/auth/facebook/callback",
        profileFields: ["emails", "picture", "displayName"]
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(profile);
          let user = await userService.findByEmail(
            "email",
            profile.emails[0].value
          );
          if (user) {
            done(null, user);
          } else {
            const newUser = await userService.save({
              first_name: profile.name.givenName,
              last_name: profile.name.familyName,
              age: 20,
              username: profile.displayName,
              email: profile.emails[0].value
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let getUser = await user.findById(id);
    done(id, getUser);
  });
};

export default initializePassportConfig;
