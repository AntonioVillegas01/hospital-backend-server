require( 'dotenv' ).config()
const express = require( 'express' )
const { dbConnection } = require( './database/config' )

const cors = require( 'cors' )


const app = express();
dbConnection()

app.use( cors() )
//Lectura y parseo del body
app.use( express.json() )

// Rutas
app.use( '/api/usuarios', require( './routes/usuarios.routes.js' ) );
app.use( '/api/hospitales', require( './routes/hospitales.routes.js' ) );
app.use( '/api/medicos', require( './routes/medicos.routes.js' ) );
app.use( '/api/todo', require( './routes/busquedas.routes' ) );
app.use( '/api/login', require( './routes/auth.routes.js' ) );
app.use( '/api/uploads', require( './routes/uploads.routes' ) );

const port = process.env.PORT

app.listen( port, () => {
    console.log( `Servidor corriendo en puerto ${port}` )
} )
