const { Schema, model } = require( 'mongoose' )

const MedicoSchema = Schema( {
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

MedicoSchema.method( 'toJSON', function() {
    // remueves los campos innecsarios destructurando el objeto principal
    const { __v, ...object } = this.toObject();
    return object;
} )

module.exports = model( 'Medico', MedicoSchema )
