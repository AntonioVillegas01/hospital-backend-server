const { response } = require( "express" );
const Medico = require( '../models/medico.model' )

const getMedicos = async( req, res = response ) => {

    const medicos = await Medico.find()
        .populate( 'usuario', 'nombre img' )
        .populate( 'hospital', 'nombre img' )

    try {
        res.json( {
            ok: true,
            medicos
        } )

    } catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador',
            error: e.message
        } )
    }
}
const getMedicoById = async( req, res = response ) => {

    const {id} = req.params

    try {
        const medico = await Medico.findById(id)
            .populate( 'usuario', 'nombre img' )
            .populate( 'hospital', 'nombre img' )
        res.json( {
            ok: true,
            medico
        } )

    } catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Medico no encontrado',
            error: e.message
        } )
    }
}
const crearMedico = async( req, res = response ) => {

    const uid = req.uid
    const hospital = req.hospital
    const medico = new Medico( {
        usuario: uid,
        hospital,
        ...req.body
    } )

    try {

        const medicoDB = await medico.save()

        res.json( {
            ok: true,
            medico: medicoDB
        } )

    } catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador',
            error: e.message
        } )
    }
}
const actualizarMedico = async ( req, res = response ) => {

    const id = req.params.id
    const uid = req.uid

    try{

        const medico = await Medico.findById(id)
        if(!medico){
            return res.status(404).json({
                ok:false,
                msg:'El medico no existe',
                medicoId:id
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true, useFindAndModify:true})


        res.json( {
            ok: true,
            msg: `El medico: ${medico.nombre} fue actualizado correctamente`,
            medico:medicoActualizado
        } )


    }catch( e ) {
        return res.status(500).json( {
            ok: false,
            msg: 'Error al actualizar el medico'
        } )
    }
}
const borrarMedico = async ( req, res = response ) => {

    const id = req.params.id
    try{

        const medico = await Medico.findById(id)
        if(!medico){
            return res.status(404).json({
                ok:false,
                msg:'El medico no existe',
                medicoId:id
            })
        }

        await Medico.findByIdAndDelete(id, { useFindAndModify: true })
        res.status(200).json( {
            ok: true,
            msg: `El medico: ${medico.nombre} fue borrado correctamente`,

        } )

    }catch( e ) {
        return res.status(500).json( {
            ok: false,
            msg: 'Error al borrar el medico'
        } )
    }
}

module.exports = {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
