import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilitar CORS
app.use(cors());

// Función para generar la serie de Fibonacci
function serieFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const serie = [0, 1];
    for (let i = 2; i < n; i++) {
        serie[i] = serie[i - 1] + serie[i - 2];
    }
    return serie;
}

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Endpoint para obtener la serie de Fibonacci
app.get("/fibonacci/:n", (req, res) => {
    const n = parseInt(req.params.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).json({ error: "Número inválido" });
    }
    const serie = serieFibonacci(n);
    res.json(serie);
});

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'fibo.html'));
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`Servidor está ejecutando en el puerto ${PUERTO}`);
});
