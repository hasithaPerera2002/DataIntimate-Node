import db from "../db/db.js";

async function getAllItemsRepo() {
  try {
    const items = db.query("SELECT * FROM items");
    return items.rows;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

async function getOneItemRepo(id) {
  try {
    const item = db.query("SELECT * FROM items WHERE id = $1", [id]);
    return item.rows[0];
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}

async function createItemRepo(item) {
  try {
    const newItem = db.query(
      "INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *",
      [item.name, item.price]
    );
    return newItem.rows[0];
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

async function updateItemRepo(id, item) {
  try {
    const updatedItem = db.query(
      "UPDATE items SET name=$1, price=$2 WHERE id = $3 RETURNING *",
      [item.name, item.price, id]
    );
    return updatedItem.rows[0];
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}

async function deleteItemRepo(id) {
  try {
    const deletedItem = db.query("DELETE FROM items WHERE id = $1", [id]);
    return deletedItem.rows[0];
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

export {
  getAllItemsRepo,
  getOneItemRepo,
  createItemRepo,
  updateItemRepo,
  deleteItemRepo,
};
