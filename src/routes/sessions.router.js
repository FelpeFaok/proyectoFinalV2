import { Router } from "express";
import passport from 'passport'
import { generalError, login, loginError, logout, register, registerError } from "../controller/sessions.controller.js";

const router = Router()

// REGISTER
router.get('/register', register)
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/error' }), registerError)

// LOGIN
router.get('/login', login)
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/error' }), loginError)

//LOGOUT
router.get('/logout', logout)

router.get('/error', generalError)


export default router