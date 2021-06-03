const { response } = require( 'express' )
const jwt = require( 'jsonwebtoken' )

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

module.exports = {
    validarJwt
}
