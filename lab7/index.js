import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fibonacciSeries(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const series = [0, 1];
    for (let i = 2; i < n; i++) {
        series[i] = series[i - 1] + series[i - 2];
    }
    return series;
}

app.use(express.static(path.join(__dirname)));

app.get("/fibonacci/:n", (req, res) => {
    const n = parseInt(req.params.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).json({ error: "Invalid number" });
    }
    const series = fibonacciSeries(n);
    res.json(series);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'fibo.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});