/*
Ruta: /api/Medicos
 */
const { Router } = require( "express" );
const { check } = require( 'express-validator' )
const { validarCampos } = require( "../middlewares/validar-campos" );
const { validarJwt } = require( "../middlewares/validar-jwt" );

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require( "../controllers/medicos.controller" );


const router = Router();


router.get( '/', getMedicos )

router.post( '/',
    [
        validarJwt,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital ID deve ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico )

router.put( '/:id', [],
    actualizarMedico )

router.delete( '/:id',
    borrarMedico, )


module.exports = router
