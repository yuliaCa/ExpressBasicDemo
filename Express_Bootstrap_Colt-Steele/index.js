const express = require("express");
const app = express();
const path = require("path");
// to help make sure views dir can be found from anywhere
// taking current current dir and joining it with /views. So instead of being in the cwd, use where the index.js is located.
const redditData = require("./data.json");

//to be able to use external files like stylesheets and JS files, we need to use static middleware
app.use(express.static("public"));
app.set("public", path.join(__dirname, "/public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cats", (req, res) => {
  const catsArray = ["Pickle", "Valerian", "Basil", "Sage"];
  res.render("cats", { catsArray });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.send(`<h2>Sorry nothing with "${subreddit}" was found ... </h2>`);
  }
});

app.get("/random", (req, res) => {
  const randNum = Math.floor(Math.random() * 10 + 10);
  res.render("random", { random: randNum });
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
