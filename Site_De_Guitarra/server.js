import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ler utilizadores
app.get("/users", (req, res) => {
  const data = fs.readFileSync("./database/users.json", "utf8");
  res.send(JSON.parse(data));
});

// Criar utilizador
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      res.status(400).send({ message: "Preencha todos os campos!" });
      return;
  }

  const data = JSON.parse(fs.readFileSync("./database/users.json"));

  // Cargo padrão: student
  data.users.push({ name, email, password, role: "student" });

  fs.writeFileSync("./database/users.json", JSON.stringify(data, null, 2));
  res.send({ message: "Utilizador criado com sucesso" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const data = JSON.parse(fs.readFileSync("./database/users.json"));

  const user = data.users.find(u => u.email === email && u.password === password);

  if (user) {
      res.send({ success: true, role: user.role, name: user.name });
  } else {
      res.send({ success: false });
  }
});

app.listen(3000, () => console.log("Servidor a correr em http://localhost:3000"));
