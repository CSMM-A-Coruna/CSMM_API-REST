// Arranque del servidor
import app from './app'
const cluster = require('cluster')
if(app.settings.env=='production') {
  if(cluster.isMaster) {
    let cpuCount =  require('os').cpus().length;
    
    for(let i = 0; i < cpuCount; i++) {
      cluster.fork()
    }
  
      // Chequeamos si el hilo a muerto
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} murió`);
      });
  } else {
    // Iniciamos el servidor en el puerto definido
    app.listen(app.get('port'))
  
    app.get('/cluster', (req, res) => {
      let worker = cluster.worker.id;
      res.status(200).json({ message: `Corriendo con el worker ==> ${worker}` });
    });
  
    console.log(`Worker: ${cluster.worker.id}`, '- Servidor iniciado en el puerto', app.get('port'))
  }
} else {
  app.listen(app.get('port'))
  console.log('Servidor iniciado en el puerto', app.get('port'))
}
