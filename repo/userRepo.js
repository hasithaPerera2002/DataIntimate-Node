import db from "../db/db";

async function getAllUsersRepo() {
  try {
    const users = db.query("SELECT name,email,password FROM users");
    return users.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function getOneUserRepo(id) {
  try {
    const user = db.query("SELECT name,email FROM users WHERE id = $1", [id]);
    return user.rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createUserRepo(user) {
  try {
    const newUser = db.query(
      "INSERT INTO users (name, email,password) VALUES ($1, $2,$3) RETURNING *",
      [user.name, user.email, user.password]
    );
    return newUser.rows[0];
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

async function updateUserRepo(id, user) {
  try {
    const updatedUser = db.query(
      "UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING *",
      [user.name, user.email, id]
    );
    return updatedUser.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUserRepo(id) {
  try {
    const deletedUser = db.query("DELETE FROM users WHERE id = $1", [id]);
    return deletedUser.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function getOneUserRepoByEmail(email) {
  try {
    const user = db.query("SELECT * FROM users WHERE email = $1", [email]);
    return user.rows[0];
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
