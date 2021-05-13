const mongoose = require( 'mongoose' )
require( 'dotenv' ).config()

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        console.log( 'DB online' )
    } catch( e ) {
        console.log( e )
        throw new Error( 'Error al iniciar base de datos' )
    }
}

module.exports = {
    dbConnection
}
