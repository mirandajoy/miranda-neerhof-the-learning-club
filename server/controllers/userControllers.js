import initKnex from "knex";
import configuration from "../knexfile.js";
import bcrypt from "bcrypt";

const knex = initKnex(configuration);

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  }

  try {
    await knex("user_profiles").insert(newUser);
    res.status(201).json("New user successfully created");
  } catch {
    res.status(500).send({ message: "An error occurred on the server" });
  }
};
