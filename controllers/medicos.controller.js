
const { response } = require( "express" );
const Medico = require('../models/medico.model')

const getMedicos = async (req, res= response ) =>{

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')

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
const crearMedico = async (req, res= response ) =>{

    const uid = req.uid
    const hospital = req.hospital
    const medico = new Medico({
        usuario: uid,
        hospital,
        ...req.body
    })

    try{

        const medicoDB = await medico.save()

        res.json( {
            ok: true,
            medico: medicoDB
        } )

    }catch( e ) {
        return res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador',
            error: e.message
        } )
    }
}
const actualizarMedico = (req, res= response ) =>{

    return  res.json( {
        ok: true,
        msg:'actualizarMedico'
    } )
}
const borrarMedico = (req, res= response ) =>{

    return  res.json( {
        ok: true,
        msg:'borrarMedico'
    } )
}

module.exports ={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
