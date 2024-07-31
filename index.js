const axios = require('axios');

// Lê a entrada do Flow Launcher
process.stdin.on('data', async (data) => {
  const query = data.toString().trim();

  // Verifica se a entrada do usuário está vazia
  if (!query) {
    console.log(JSON.stringify([]));
    return;
  }

  try {
    // Consulta a API para obter a cotação do USD para BRL
    const moedaResponse = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL', {
      headers: {
        accept: 'application/json'
      }
    });

    const quant = parseFloat(query);
    if (isNaN(quant)) {
      console.log(JSON.stringify([]));
      return;
    }

    const cotacao = moedaResponse.data.USDBRL.high;
    const cot = cotacao * quant;

    // Envia o resultado para o Flow Launcher
    const result = [{
      Title: `Cotação: R$ ${cot.toFixed(2)}`,
      SubTitle: `Cotação do USD em BRL multiplicado por ${quant}`,
      IcoPath: 'Images/app.png'
    }];
    console.log(JSON.stringify(result));
  } catch (err) {
    console.error('Erro ao buscar dados', err);
    console.log(JSON.stringify([]));
  }
});
