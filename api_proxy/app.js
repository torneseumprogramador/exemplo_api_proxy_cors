const express = require('express');
const cors = require('cors'); // Importa o pacote CORS

const app = express();
const PORT = 3002;

// Habilita o CORS para todas as origens
app.use(cors());

// Rota genérica de proxy para repassar todas as solicitações
app.use('/*', async (req, res, next) => {
  const originalUrl = `http://localhost:3000${req.originalUrl}`;

  try {
    // Faz o import dinâmico do node-fetch
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(originalUrl, {
      method: req.method,
      headers: { ...req.headers },
      body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? req.body : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    next(error);
  }
});

// Middleware de erro simples
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Erro ao processar o proxy', details: err.message });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor de proxy rodando em http://localhost:${PORT}`);
});
