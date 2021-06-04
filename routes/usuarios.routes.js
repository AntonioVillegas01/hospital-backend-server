/*
Ruta: /api/usuarios
* */
const {
    validarJwt,
    validarADMIN_ROLE,
    validarADMIN_ROLE_O_MISMO_USUARIO
} = require( "../middlewares/validar-jwt" );
const { Router } = require( "express" );

const { check } = require( 'express-validator' )
const { validarCampos } = require( "../middlewares/validar-campos" );
const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require( '../controllers/usuarios.controller' );


const router = Router();


router.get( '/', validarJwt, getUsuarios )

router.post( '/',
    [
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'password', 'La contraseña es obligatorio' ).not().isEmpty(),
        check( 'email', 'El email es obligatorio' ).isEmail(),
        validarCampos
    ], crearUsuario )

router.put( '/:id', [
    validarJwt,
    validarADMIN_ROLE_O_MISMO_USUARIO,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'role', 'El role es obligatorio' ).not().isEmpty(),
    validarCampos
], actualizarUsuario )

router.delete( '/:id', [
    validarJwt,
    validarADMIN_ROLE
], borrarUsuario )


module.exports = router
