const fs = require( 'fs' )
const Usuario = require( '../models/usuario.model' )
const Medico = require( '../models/medico.model' )
const Hospital = require( '../models/hospital.model' )

const borrarImagen = (path)=>{
    if( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path )
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    let pathViejo;

    switch( tipo ) {
        case  'medicos':
            const medico = await Medico.findById( id )
            if( !medico ) {
                console.log( 'no es un medico' )
                return false //no se subio la imagen
            }
            pathViejo = `./uploads/medicos/${medico.img}`
            borrarImagen(pathViejo)

            medico.img = nombreArchivo;
            await medico.save();

            return true
        case  'hospitales':
            const hospital = await Hospital.findById( id )
            if( !hospital ) {
                console.log( 'no es un hospital' )
                return false //no se subio la imagen
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`
            borrarImagen(pathViejo)

            hospital.img = nombreArchivo;
            await hospital.save();

            return true
        case  'usuarios':
            const usuario = await Usuario.findById( id )
            if( !usuario ) {
                console.log( 'no es un usuario' )
                return false //no se subio la imagen
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`
            borrarImagen(pathViejo)

            usuario.img = nombreArchivo;
            await usuario.save();

            return true
        default:
            break;

    }


}

module.exports = {
    actualizarImagen
}
