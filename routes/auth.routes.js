/*
    path: '/api/login'
 */

const { validarJwt } = require( "../middlewares/validar-jwt" );
const { validarCampos } = require( "../middlewares/validar-campos" );
const { check } = require( "express-validator" );
const { Router } = require( 'express' );
const { login, googleSignIn, renewToken } = require( "../controllers/auth.controller" );

const router = Router();

router.post( '/', [
    check( 'email', 'El correo es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    validarCampos
], login )

router.post( '/google', [
    check( 'token', 'El token de google es obligatorio' ).not().isEmpty(),
    validarCampos
], googleSignIn )

router.get( '/renew',
    validarJwt
    , renewToken )

module.exports = router
