import { useState } from 'react';

function App() {
  const [texto, setTexto] = useState('');
  const [colaborador, setColaborador] = useState('');
  const [resultado, setResultado] = useState(null);

  const analisar = async () => {
    const formData = new FormData();
    formData.append('texto', texto);
    formData.append('colaborador', colaborador);

    const res = await fetch('http://localhost:8000/analisar_texto/', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setResultado(data);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Analisador Gramatical</h1>
      <input
        type="text"
        placeholder="Nome do colaborador"
        value={colaborador}
        onChange={(e) => setColaborador(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <textarea
        placeholder="Texto do atendimento"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="border p-2 w-full h-40 mb-4"
      />
      <button onClick={analisar} className="bg-blue-600 text-white px-4 py-2 rounded">
        Analisar
      </button>

      {resultado && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <p><strong>Colaborador:</strong> {resultado.colaborador}</p>
          <p><strong>Total de erros:</strong> {resultado.total_erros}</p>
          <p><strong>Erros por 100 palavras:</strong> {resultado.erros_por_100_palavras}</p>
          <p><strong>Erros de alto impacto:</strong> {resultado.erros_alto_impacto}</p>
        </div>
      )}
    </div>
  );
}

export default App;
