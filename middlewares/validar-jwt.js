const { response } = require( 'express' )
const jwt = require( 'jsonwebtoken' )
const Usuario = require('../models/usuario.model')


const validarJwt = ( req, res = response, next ) => {
    //leer el token de la request
    const token = req.header( 'x-token' )
    if( !token ) {
        return res.status( 401 ).json( {
            ok: false,
            msg: 'No hay token en la petición'
        } )
    }
    try {
        //Verificar el token
        const { uid } = jwt.verify( token, process.env.JWT_SECRET )
      //  console.log( uid )
        req.uid = uid
        next()
    } catch( e ) {
        return res.status( 401 ).json( {
            ok: false,
            msg: 'Token inválido'
        } )
    }

}

const validarADMIN_ROLE = async (req, res, next) => {
    const uid = req.uid
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
          return res.status(403).json({
                ok:false,
                msg:'No tiene privilegios para hacer eso'
            })
        }
        next();

    }catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'HAble con el administrador'
        } )
    }

}

const validarADMIN_ROLE_O_MISMO_USUARIO = async (req, res, next) => {
    const uid = req.uid
    const id = req.params.id

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }

        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok:false,
                msg:'No tiene privilegios para hacer eso'
            })
        }

    }catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'HAble con el administrador'
        } )
    }

}

module.exports = {
    validarJwt,
    validarADMIN_ROLE,
    validarADMIN_ROLE_O_MISMO_USUARIO
}
