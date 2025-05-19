import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoute.js";
import movieRoutes from "./routes/movieRouter.js";
import cors from "cors";

const app = express();

// Middlewars
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

// Ruta base
app.get("/", (req, res) => {
    res.json({
        message: "API TP2 - Mflix",
        endpoints: [
            { method: "GET", path: "/api/users", description: "Lista todos los usuarios" },
            { method: "GET", path: "/api/users/:id", description: "Obtiene un usuario por ID" },
            { method: "GET", path: "/api/movies", description: "Lista todas las películas (soporta paginado)" },
            { method: "GET", path: "/api/movies/:id", description: "Obtiene una película por ID" },
        ],
        pagination: {
            endpoint: "/api/movies",
            params: [
                { name: "page", description: "Número de página (opcional, por defecto 1)" },
                { name: "pageSize", description: "Cantidad de películas por página (opcional, por defecto 10)" }
            ]
        },
        awarded: {
            endpoint: "/api/movies",
            params: [
                {name: "awarded", description: "Boolean que indica si un filme tiene al menos un premio o no"}
            ]
        },
        language: {
            endpoint: "/api/movies",
            params: [
                {name: "language", description: "Filtra la lista de peliculas por idioma. El idioma debe estar nombrado en inglés, con la primera letra en mayúscula"}
            ]
        },
        tomatoes: {
            endpoint: "/api/movies",
            params: [
                {name: "tomatoes", description: "Boolean. Si es true devuelve la lista de peliculas ordenada por la puntuación 'fresh' de tomatoes (opcional)"}
            ]
        }
    });
});

export default app;