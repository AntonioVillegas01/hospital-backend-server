const { response } = require( 'express' )
const bcrypt = require( 'bcryptjs' )
const Usuario = require( '../models/usuario.model' )
const { generarJWT } = require( "../helpers/jwt" );
const { googleVerify } = require( "../helpers/google-verify" );


const login = async( req, res = response ) => {
    const { email, password } = req.body
    try {

        // Verificart email
        const usuarioDB = await Usuario.findOne( { email } )
        if( !usuarioDB ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'El usuario es incorrecto'
            } )
        }

        // Verificart contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password )
        if( !validPassword ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'La contraseña no es valida'
            } )
        }
        // Generar un token
        const token = await generarJWT( usuarioDB.id );


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


const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token
    try {
        const { name, email, picture } = await googleVerify( googleToken )

        const usuarioDB = await Usuario.findOne( { email } );
        let usuario
        if( !usuarioDB ) {
            // si  no existe el usuario
            usuario = new Usuario( {
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            } )
        } else {
            //  existe el usuario
            usuario = usuarioDB
            usuario.google = true
           // usuario.password = '@@@'
        }

        // Guardar en DB
        await usuario.save()

        // Generar un token
        const token = await generarJWT( usuario.id );

        res.json( {
            ok: true,
            token
        } )

    } catch( e ) {


        res.status( 401 ).json( {
            ok: false,
            msg: 'Token no es correcto',
        } )
    }
}

const renewToken = async ( req, res = response ) =>{

    const uid = req.uid
    // Generar un token
    const token = await generarJWT( uid );

    res.json({
        ok:true,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}
