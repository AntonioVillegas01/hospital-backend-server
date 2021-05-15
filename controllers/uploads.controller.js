const path = require( 'path' );
const fs = require( "fs" );
const { v4: uuidv4 } = require( 'uuid' );
const { response } = require( 'express' )
const { actualizarImagen } = require( "../helpers/actualizar-imagen" );

const uploadFile = ( req, res = response ) => {

    const { tipo, id } = req.params
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    // Validar tipo
    if( !tiposValidos.includes( tipo ) ) {
        return res.status( 400 ).json( {
            ok: false,
            msg: 'No es medico usuario u hospital'
        } )
    }
    // Validar que exista un archivo
    if( !req.files || Object.keys( req.files ).length === 0 ) {
        return res.status( 400 ).send( {
            ok: false,
            msg: 'No se subio ningun archivo.'
        } );
    }

    //Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split( '.' );
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]

    //validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status( 400 ).send( {
            ok: false,
            msg: 'Tipo de archivo no soportado'
        } );
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    // Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    // Mover la imagen
    file.mv( path, ( err ) => {
        if( err ) {
            console.log( err )
            return res.status( 500 ).json( {
                ok: false,
                msg: 'Error al mover la imagen'
            } );
        }

        //actualizar Base Datos
        actualizarImagen( tipo, id, nombreArchivo )

        res.json( {
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        } )
    } );


}

const retornaImagen = ( req, res = response ) => {
    const { tipo, foto } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` )

    //imagen por defecto
    if( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg )
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` )
        res.sendFile( pathImg )
    }


}

module.exports = {
    uploadFile,
    retornaImagen
}
