import db from "../db/db.js";

async function getAllUsersRepo() {
  try {
    const [users] = await db
      .promise()
      .query("SELECT id,name,email,password FROM users");
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function getOneUserRepo(id) {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT name, email FROM users WHERE id = ?", [id]);

    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createUserRepo(user) {
  try {
    const newUser = await db
      .promise()
      .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        user.name,
        user.email,
        user.password,
      ]);

    const userId = newUser[0].id;

    const insertedUser = await db
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [userId]);

    return insertedUser[0][0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function updateUserRepo(user, id) {
  try {
    const [result] = await db
      .promise()
      .query("UPDATE users SET name=?, email=? WHERE id = ? ", [
        user.name,
        user.email,
        id,
      ]);

    if (result.affectedRows === 1) {
      return { id, ...user };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUserRepo(id) {
  try {
    const [deletedUser] = await db
      .promise()
      .query("DELETE FROM users WHERE id = ?", [id]);
    return deletedUser[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function getOneUserRepoByEmail(email) {
  try {
    const [user] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    return user[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export {
  getAllUsersRepo,
  getOneUserRepo,
  createUserRepo,
  updateUserRepo,
  deleteUserRepo,
  getOneUserRepoByEmail,
};
