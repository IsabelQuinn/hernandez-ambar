import express from "express";

const app = express();

// Pseudo-base de datos
let ingresos = [];
let egresos = [];

// Middleware para parsear JSON
app.use(express.json());

// Controlador para almacenar ingresos
app.post("/api/ingresos", (req, res) => {
    const ingreso = req.body;
    if (!ingreso.monto || !ingreso.descripcion) {
        return res.status(400).json({ error: "Monto y descripción son requeridos" });
    }
    ingresos.push(ingreso);
    res.status(201).json({ message: "Ingreso registrado", ingreso });
});

// Controlador para obtener ingresos
app.get("/api/ingresos", (req, res) => {
    res.json(ingresos);
});

// Controlador para almacenar egresos
app.post("/api/egresos", (req, res) => {
    const egreso = req.body;
    if (!egreso.monto || !egreso.descripcion) {
        return res.status(400).json({ error: "Monto y descripción son requeridos" });
    }
    egresos.push(egreso);
    res.status(201).json({ message: "Egreso registrado", egreso });
});

// Controlador para obtener egresos
app.get("/api/egresos", (req, res) => {
    res.json(egresos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
