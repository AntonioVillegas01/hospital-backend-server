const Usuario = require( '../models/usuario.model' )
const { response } = require( "express" );
const bcrypt = require( 'bcryptjs' )
const { generarJWT } = require( "../helpers/jwt" );


const getUsuarios = async( req, res ) => {

    const desde = Number( req.query.desde ) || 0;
    const limit = Number( req.query.limit ) || 10;

    try{
        const [usuarios, total] = await Promise.all( [
            Usuario
                .find( {}, 'nombre email role google img' )
                .skip( desde )
                .limit( limit ),
            Usuario.countDocuments()
        ] )

        res.json( {
            total,
            ok: true,
            usuarios,
            uid: req.uid
        } )
    }catch( e ) {
        console.log( e )
        res.status( 500 ).json( {
            ok: true,
            msg: 'Error insesperado .. revisar logs'
        } )
    }
}
const crearUsuario = async( req, res = response ) => {
    const { email, password } = req.body
    try {
        const existeEmail = await Usuario.findOne( { email } )
        if( existeEmail ) {
            return res.status( 400 ).json( {
                ok: true,
                msg: 'El correo ya esta registrado'
            } )
        }
        const usuario = new Usuario( req.body )

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt )
        // Guardar Usuario
        await usuario.save();

        // Generar un token
        const token = await generarJWT( usuario.id );

        res.json( {
            ok: true,
            usuario,
            token
        } )

    } catch( e ) {
        console.log( e )
        res.status( 500 ).json( {
            ok: true,
            msg: 'Error insesperado .. revisar logs'
        } )
    }

}
const actualizarUsuario = async( req, res = response ) => {
    //todo: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id

    try {
        const usuarioDB = await Usuario.findById( uid )

        if( !usuarioDB ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'No existe un usuario con ese id'
            } )
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body

        if( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne( { email } );
            if( existeEmail ) {
                return res.status( 400 ).json( {
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                } )
            }
        }

        if(!usuarioDB.google){
            campos.email = email;
        }else if(usuarioDB.email !== email){
            return res.status(400).json({
                ok:false,
                msg:'Usuarios de google no pueden cambiar su correo'
            })
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )

        res.json( {
            ok: true,
            usuario: usuarioActualizado
        } )

    } catch( e ) {
        console.log( e )
        res.status( 500 ).json( {
            ok: false,
            msg: 'Error insesperado al actualizar usuarios.. revisar logs'
        } )
    }
}
const borrarUsuario = async( req, res = response ) => {

    const uid = req.params.id

    try {
        const usuarioDB = await Usuario.findById( uid )

        if( !usuarioDB ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'No existe un usuario con ese id'
            } )
        }

        await Usuario.findByIdAndDelete( uid )

        res.json( {
            ok: true,
            usuario: `Usuario ${uid} eliminado`
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
