

const { Router } = require( "express" );
const { check } = require( 'express-validator' )
const { validarCampos } = require( "../middlewares/validar-campos" );
const { validarJwt } = require( "../middlewares/validar-jwt" );
const { getTodo, getDocumentosColeccion } = require( "../controllers/busquedas.controller" );

const router = Router();



router.get( '/:busqueda',[
    validarJwt
], getTodo )

router.get( '/coleccion/:tabla/:busqueda',validarJwt, getDocumentosColeccion )



module.exports = router;
