module.exports = app => {
    const peliculas = require("../controllers/peliculas.controllers.js");
    var router = require("express").Router();

    // Create a new Pelicula
    router.post("/create", peliculas.create);

    // Retrieve all Peliculas
    router.get("/", peliculas.findAll);

    // Retrieve all Peliculas de drama (ejemplo)
    router.get("/drama", peliculas.findAllDrama);

    // Retrieve a single Pelicula with id
    router.get("/:id", peliculas.findOne);

    // Update a Pelicula with id
    router.put("/update/:id", peliculas.update);

    // Delete a Pelicula with id
    router.delete("/delete/:id", peliculas.delete);

    // Delete all Peliculas
    router.delete("/delete", peliculas.deleteAll);

    // Endpoint base
    app.use("/api/peliculas", router);
};
