import passport from "passport";
import local from "passport-local"
import jwt from 'passport-jwt'
import { createHash, isValidPassword, generateToken, extractCookie } from '../utils.js'
import config from "./config.js";
import UserModel from "../dao/mongo/models/user.model.js";
import CartModel from "../dao/mongo/models/cart.model.js";

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
//  Local strategy
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
            const user = await UserModel.findOne({email: username})
            if(user) {
                console.log('User already exits');
                return (done, false)
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                role,
                password: createHash(password),
                cart: (await CartModel.create({}))._id
            }
            if (newUser.email == "admin@admin.cl" && password == "adminpass")
                {(newUser.role = "admin")}
            
            const result = await UserModel.create(newUser)

            return done(null, result)

        } catch (error) {
            return done("[LOCAL] Error en registro " + error)
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username }).lean().exec()
            if(!user) {
                console.log('User dont exits (login) ');
                return done(null, user)
            }

            if(!isValidPassword(user, password))
            return done(null, false);
            
            const token = generateToken(user)
            user.token = token

            return done(null, user)
        } catch (error) {
            return done("[LOCAL] Error en Login " + error)
        }
    }))

    //jwt Strategy

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: config.jwtPrivateKey
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))

    if (config.persistence === "FILE") {
        passport.serializeUser((user, done) => {
            done(null, user.id)
        })
        passport.deserializeUser(async (id, done) => {
            const user = await UserModel.findOne(id)
            done(null, user)
        })
        
    } else {
        passport.serializeUser(async (user, done) => {
            done(null, user._id)
        })
        passport.deserializeUser(async (id, done) => {
            const user = await UserModel.findById(id)
            done(null, user)
        })
    }
}

export default initializePassport