const { response } = require( 'express' )
const Usuario = require('../models/usuario.model')
const bcrypt = require('bcryptjs')
const { generarJWT } = require( "../helpers/jwt" );

const login = async( req, res = response ) => {
    const { email, password } = req.body
    try {

        // Verificart email
        const usuarioDB = await Usuario.findOne( { email })
        if(!usuarioDB){
          return  res.status( 404 ).json( {
                ok: false,
                msg: 'El usuario es incorrecto'
            } )
        }

        // Verificart contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            })
        }
        //todo: Generar un token
        const token = await generarJWT(usuarioDB.id);


        res.json( {
            ok: true,
            token
        } )
    } catch( e ) {
        console.log( e )
        res.status( 500 ).json( {
            ok: false,
            msg: 'Error insesperado al Borrar usuarios.. revisar logs'
        } )
    }
}

module.exports = {
    login
}
