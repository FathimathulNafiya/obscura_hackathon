const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "database.json");

// Helper to read data
const readData = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { jobs: [], applications: [] };
  }
};

// Helper to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database:", error);
  }
};

module.exports = { readData, writeData };
