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
  };

  try {
    const existingUsers = await knex("user_profiles").where({ email: email });
    if (existingUsers.length > 0) {
      return res.status(404).send({ message: "This user already exists" });
    } else {
      await knex("user_profiles").insert(newUser);
      return res.status(201).json("New user successfully created");
    }
  } catch (error) {
    return res.status(500).send({ message: "An error occurred on the server" });
  }
};
