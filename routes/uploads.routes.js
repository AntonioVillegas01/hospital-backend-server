const { Router } = require( "express" );
const { check } = require( 'express-validator' )
const expressFileUpload = require('express-fileupload');

const { validarCampos } = require( "../middlewares/validar-campos" );
const { validarJwt } = require( "../middlewares/validar-jwt" );
const { uploadFile, retornaImagen } = require( "../controllers/uploads.controller" );

const router = Router();

router.use(expressFileUpload());


router.put( '/:tipo/:id',validarJwt, uploadFile )

router.get( '/:tipo/:foto', retornaImagen )



module.exports = router;
