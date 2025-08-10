module.exports = app => {
    const peliculas = require("../controllers/peliculas.controllers.js");
    var router = require("express").Router();

   
    router.post("/create", peliculas.create);

   
    router.get("/", peliculas.findAll);


    router.get("/drama", peliculas.findAllDrama);

  
    router.get("/:id", peliculas.findOne);

   
    router.put("/update/:id", peliculas.update);

  
    router.delete("/delete/:id", peliculas.delete);

  
    router.delete("/delete", peliculas.deleteAll);

   
    app.use("/api/peliculas", router);
};
