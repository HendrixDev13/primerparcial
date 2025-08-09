
const db = require("../models");
const Pelicula = db.peliculas; // Asegúrate que en models/index.js se llame 'peliculas'
const Op = db.Sequelize.Op;

// Create and Save a new Pelicula
exports.create = (req, res) => {
    // Validamos que dentro del request no venga vacío el nombre
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacío!"
        });
        return;
    }

    // Creamos un objeto pelicula con los datos recibidos
    const pelicula = {
        nombre: req.body.nombre,
        sinopsis: req.body.sinopsis,
        actores: req.body.actores,
        duracion: req.body.duracion,
        tipo: req.body.tipo,
        fechalanzamiento: req.body.fechalanzamiento,
        categoria: req.body.categoria,
        drama: req.body.drama
    };

    // Guardar en la BD
    Pelicula.create(pelicula)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear la Pelicula."
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pelicula.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al recuperar las Peliculas."
            });
        });
};

// Find a single Pelicula with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pelicula.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error recuperando Pelicula con id=" + id
            });
        });
};

// Update a Pelicula by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pelicula.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelicula fue actualizada correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la Pelicula con id=${id}. Tal vez no existe o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando Pelicula con id=" + id
            });
        });
};

// Delete a Pelicula with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pelicula.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelicula fue eliminada correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la Pelicula con id=${id}. Tal vez no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la Pelicula con id=" + id
            });
        });
};

// Delete all Peliculas from the database.
exports.deleteAll = (req, res) => {
    Pelicula.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Peliculas fueron eliminadas correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error eliminando todas las Peliculas."
            });
        });
};

// find all Peliculas de tipo drama (ejemplo)
exports.findAllDrama = (req, res) => {
    Pelicula.findAll({ where: { drama: "si" } }) // Ajusta "si" a tu valor esperado
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al recuperar las Peliculas de drama."
            });
        });
};
