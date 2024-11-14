var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Usando import dinâmico para o node-fetch
    const fetch = (await import('node-fetch')).default;
    
    // Faz a chamada à API
    const response = await fetch('http://localhost:3000/clientes');
    const clientes = await response.json();

    // Renderiza a página com a lista de clientes
    res.render('index', { title: 'Express', clientes: clientes });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.render('index', { title: 'Express', clientes: [] });
  }
});

module.exports = router;
