require( 'dotenv' ).config()
const express = require( 'express' )
const { dbConnection } = require( './database/config' )

const cors = require('cors')

const app = express();
dbConnection()

app.use(cors())

//Rutas
app.get( '/', ( req, res ) => {
    res.json( {
        ok: true,
        msg: 'Hola Mundo'
    } )
} )

const port = process.env.PORT

app.listen( port, () => {
    console.log( `Servidor corriendo en puerto ${port}` )
} )
