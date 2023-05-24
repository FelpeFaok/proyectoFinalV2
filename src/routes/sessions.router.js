import { Router } from 'express';
import passport from 'passport';
import { passportCall, authorization} from '../utils.js';
import __dirname from '../utils.js';
import config from '../config/config.js';
import UserDTO from '../dao/dto/user.dto.js'


const router = Router();

//vista para registrar users
router.get('/', (req, res) => {
    res.redirect('/session/register');
});

router.get('/register', (req, res) => {
    res.render('session/register');
});


//api para generar usuarios
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login');
});

router.get('/failregister', (req, res) => {
    console.log('Fail Strategy register');
    res.send({ error: 'Failed' });
})

//vista de login
router.get('/login', (req, res) => {
    res.render('session/login');
})

//api para login con jwt
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {

    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }

    //cookie del token
    res.cookie(config.jwtCookieName, req.user.token).redirect('/products');
})

router.get('/faillogin', (req, res) => {
    console.log('Fail Strategy login');
    res.send({ error: 'Fail login' });
})

// cerrar session
router.get('/logout', (req, res) => {
    // borra la cookie
    res.clearCookie(config.jwtCookieName).redirect('/');
});

router.get('/private', passportCall('jwt'), authorization('user'), (req, res)=>{
    res.send({status: 'success', payload: req.user, role: 'user'});
});

router.get('/secret', passportCall('jwt'), authorization('admin'), (req, res)=>{
    res.send({status: 'success', payload: req.user, role: 'ADMIN'});
});

router.get('/current', passportCall('jwt'), authorization('user'), (req, res)=>{
    res.render('session/profile', {
        user: new UserDTO(req.user.user).getCurrent()
    })
})

export default router;