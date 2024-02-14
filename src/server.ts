import { config } from "dotenv";
import { createUser, deleteUser, getUsers } from "./userControllers";
import { deleteBookUser, saveBookToUser } from "./bookControllers";
import express from "express";
const app = express();
config();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/users", getUsers);

app.delete("/deleteUser", deleteUser);

app.post("/users", createUser);

app.post("/saveBookToUser", saveBookToUser);

app.delete("/deleteBookUser", deleteBookUser);

app.listen(PORT, () => {
  console.log(`Server Running In Port: ${PORT}`);
});
