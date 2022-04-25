// Arranque del servidor
import app from './app'
const cluster = require('cluster')

if(cluster.isMaster) {
  let cpuCount =  require('os').cpus().length;
  for(let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }
} else {
  // Iniciamos el servidor en el puerto definido
  app.listen(app.get('port'))
  console.log(`Worker: ${cluster.worker.id}`, '- Servidor iniciado en el puerto', app.get('port'))
}