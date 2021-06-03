/*
Ruta: /api/Medicos
 */
const { Router } = require( "express" );
const { check } = require( 'express-validator' )
const { validarCampos } = require( "../middlewares/validar-campos" );
const { validarJwt } = require( "../middlewares/validar-jwt" );

const {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require( "../controllers/medicos.controller" );


const router = Router();


router.get( '/', validarJwt,getMedicos )

router.get( '/:id',
    validarJwt,
    getMedicoById, )

router.post( '/',
    [
        validarJwt,
        check( 'nombre', 'El nombre del medico es necesario' ).not().isEmpty(),
        check( 'hospital', 'El nombre del medico es necesario' ).not().isEmpty(),
        check( 'hospital', 'El hospital ID debe ser valido' ).isMongoId(),
        validarCampos
    ],
    crearMedico )

router.put( '/:id', [
        validarJwt,
        check( 'nombre', 'El nombre del medico es necesario' ).not().isEmpty(),
        check( 'hospital', 'El hospital ID debe ser valido' ).isMongoId(),
        validarCampos
    ],
    actualizarMedico )

router.delete( '/:id',
    validarJwt,
    borrarMedico, )




module.exports = router
