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
const actualizarHospital = async ( req, res = response ) => {

    const id = req.params.id
    const uid = req.uid
    const hospital = req

    try {

        const hospital = await Hospital.findById(id)
        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
                hospitalId:id
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new:true})

        res.json( {
            ok: true,
            msg: 'Hospital Actualizado correctamente',
            hospital: hospitalActualizado

        } )

    }catch( e ) {
        return res.status(500).json( {
            ok: false,
            msg: 'Error al actualizar Hospital',
            error: e
        } )
    }
}
const borrarHospital = async ( req, res = response ) => {

    const id = req.params.id

    try {

        const hospital = await Hospital.findById(id)
        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
                hospitalId:id
            })
        }

        await Hospital.findByIdAndDelete(id)

        res.json( {
            ok: true,
            msg: 'Hospital Borrado correctamente',

        } )

    }catch( e ) {
        return res.json( {
            ok: false,
            msg: 'Error al eliminar Hospital',
            error: e
        } )
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
