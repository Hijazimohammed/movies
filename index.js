var express = require("express");
var validate = require("./validate.js");
var mongoose = require("mongoose");
var moviesRouter = require("./routes/movies");
var app = express();
var PORT = process.env.PORT || 3000;
var DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/movies";
const db = mongoose.connection;

app.use(express.static("public"));

mongoose.connect(
  DATABASE_URL,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));
app.use(express.json());
app.use("/movies", moviesRouter);
app.listen(PORT, () => console.log("lestening on port : ", PORT));

/*
const lessons = [
  { id: 1, lesson: "lesson1" },
  { id: 2, lesson: "lesson2" },
  { id: 3, lesson: "lesson3" },
];
//GET ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//GET ROUTE
app.get("/api/lessons", (req, res) => {
  res.send(lessons);
});
//GET ROUTE
app.get("/api/lessons/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) res.status(404).send("The lesson ID given was not found");
  res.send(lesson);
});
//POST ROUTE
app.post("/api/lessons", (req, res) => {
  validate(req, res);
  const lesson = {
    id: lessons.length + 1,
    lesson: req.body.lesson,
  };
  lessons.push(lesson);
  res.send(lesson);
});
//PUT ROUTE
app.put("/api/lessons/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) res.status(404).send("The lesson ID given was not found");
  validate(req, res);
  lesson.lesson = req.body.lesson;
  res.send(lesson);
});
//DELETE ROUTE
app.delete("/api/lessons/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) res.status(404).send("The lesson ID given was not found");
  const index = lessons.indexOf(lesson);
  lessons.splice(index, 1);
  res.send(lesson);
});
*/
