/*
    path: '/api/login'
 */

const { validarCampos } = require( "../middlewares/validar-campos" );
const { check } = require( "express-validator" );
const {Router} = require('express');
const { login } = require( "../controllers/auth.controller" );

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)

module.exports = router
