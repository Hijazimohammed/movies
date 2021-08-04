const express = require("express");
const router = express.Router();
const Movie = require("../model/movie");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", getMovie, (req, res) => {
  res.json(res.movie);
});
router.post("/", async (req, res) => {
  const movie = new Movie({
    movieDirector: req.body.movieDirector,
    movieTitle: req.body.movieTitle,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "deleted movie" });
  } catch (error) {
    res.status(500).json({ message: "Could not found movie" });
  }
});
router.patch("/:id", getMovie, async (req, res) => {
  if (req.body.movieDirector != null) {
    res.movie.movieDirector = req.body.movieDirector;
  }
  if (req.body.movieTitle != null) {
    res.movie.movieTitle = req.body.movieTitle;
  }
  try {
    const updateMovie = await res.movie.save();
    res.json("sucess updated ");
  } catch (error) {
    res.status(500).json({ message: "movie not updated" });
  }
});

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null)
      return res.status(404).json({ message: "Cannot find movie." });
  } catch (error) {
    return res.status(500).json({ message: "The ID selected was not found." });
  }
  res.movie = movie;
  next();
}

module.exports = router;
