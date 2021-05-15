const { response } = require( "express" );
const Hospital = require( '../models/hospital.model' )

const getHospitales = async( req, res = response ) => {

    const hospitales = await Hospital.find()
        .populate('usuario','nombre img')

    try {
        res.json( {
            ok: true,
            hospitales
        } )

    } catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador',
            error: e.message
        } )
    }


}
const crearHospital = async( req, res = response ) => {

    const uid = req.uid
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    } );

    try {

        const hospitalDB = await hospital.save()

        res.json( {
            ok: true,
            hospital: hospitalDB
        } )

    } catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador',
            error: e.message
        } )
    }


}
const actualizarHospital = ( req, res = response ) => {

    return res.json( {
        ok: true,
    } )
}
const borrarHospital = ( req, res = response ) => {

    return res.json( {
        ok: true,
    } )
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
