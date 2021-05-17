/*
    path: '/api/login'
 */

const { validarCampos } = require( "../middlewares/validar-campos" );
const { check } = require( "express-validator" );
const {Router} = require('express');
const { login, googleSignIn } = require( "../controllers/auth.controller" );

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)

router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn)

module.exports = router
