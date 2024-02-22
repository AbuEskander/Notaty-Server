const express = require("express");
const cors = require("cors");

const app = express();
const Database = require("./Database");
const db = new Database();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.post("/notes", (req, res) => {
  const body = req.body;
  console.log(body);
  db.addNote(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/notes", async (req, res) => {
  const { title } = req.query;
  if (title) {
    db.getNoteByTitle(title)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send(err));
  } else {
    db.getNotes()
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send(err));
  }
});
app.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  db.getOneNote(id)
    .then((data) => {
      if (!data) res.status(404).send("Record not found :" + id);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.put("/notes", (req, res) => {
  db.updateNote(req.body)
    .then((data) => {
      console.log(req.body);
      if (!data) res.status(404).send("Record not found :" + id);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.put("/notes", (req, res) => {
  db.updateNote(req.body)
    .then((data) => {
      console.log(req.body);
      if (!data) res.status(404).send("Record not found :" + id);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/notes/:id", (req, res) => {
  db.deleteNote(req.params.id)
    .then((data) => {
      console.log(req.body);
      if (!data) res.status(404).send("Record not found :" + id);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.listen(PORT, () => {
  console.log("Server is running on PORT : " + PORT);
  db.connect();
});
