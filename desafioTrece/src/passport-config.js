import passport from "passport";
import fbStrategy from "passport-facebook";
import { users } from "./model/usuario.js";

const FacebookStrategy = fbStrategy.Strategy;

const initializePassportConfig = () => {
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: "721247842594027",
        clientSecret: "a327fb0463fb2ec2c75c065376b01108",
        callbackURL:
          "https://a166-190-236-87-152.ngrok.io/auth/facebook/callback",
        profileFields: ["emails", "picture", "displayName"]
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(profile);
          let user = await users.findOne({
            email: profile.emails[0].value
          });
          done(null, user);
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
