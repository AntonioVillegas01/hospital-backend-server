const { response } = require( "express" );
const Usuario = require( '../models/usuario.model' )
const Medico = require( '../models/medico.model' )
const Hospital = require( '../models/hospital.model' )

const getTodo = async( req, res = response ) => {
    const busqueda = req.params.busqueda || 'sin termino';
    const regex = new RegExp( busqueda, 'i' )
    const [usuarios, medicos, hospitales] = await Promise.all( [
        Usuario.find( { nombre: regex } ),
        Medico.find( { nombre: regex } ),
        Hospital.find( { nombre: regex } )
    ] )
    try {
        res.json( {
            ok: true,
            msg: 'Busqueda ok',
            usuarios,
            medicos,
            hospitales
        } )


    } catch( e ) {
        console.log( e )
        res.status( 500 ).json( {
            ok: true,
            msg: 'Error insesperado en busqueda .. revisar logs'
        } )
    }
}


const getDocumentosColeccion = async( req, res = response ) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' )
    let data = [];

    console.log(tabla)
    console.log(busqueda)

    try {

        switch( tabla ) {
            case 'medicos':
                data = await Medico.find( { nombre: regex } )
                    .populate( 'usuario', 'nombre img' )
                    .populate( 'hospital', 'nombre img' )
                break;

            case 'hospitales':
                data = await Hospital.find( { nombre: regex } )
                    .populate( 'usuario', 'nombre img' )
                break;

            case 'usuarios':
                data = await Usuario.find( { nombre: regex } )
                break;

            default:
                return res.status( 400 ).json( {
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                } )
        }


        res.json( {
            ok: true,
            resultados: data,
            tabla
        } )


    } catch( e ) {
        console.log( e )
        res.status( 500 ).json( {
            ok: true,
            msg: 'Error insesperado en busqueda .. revisar logs'
        } )
    }
}


module.exports = {
    getTodo,
    getDocumentosColeccion
}
