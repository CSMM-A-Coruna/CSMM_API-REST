// Arranque del servidor
import app from './app'


// Iniciamos el servidor en el puerto definido
app.listen(app.get('port'))
console.log('Servidor iniciado en el puerto', app.get('port'))