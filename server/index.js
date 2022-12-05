const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const {
  getCompliment,
  getFortune,
  getFoods,
  createFood,
  updateFood,
  deleteFood,
} = require("./controller");

app.get("/api/compliment", getCompliment);
app.get("/api/fortunes", getFortune);

// get, post, put, delete endpoints for favorite food list

app.get(`/api/foods`, getFoods);
app.post(`/api/foods`, createFood);
app.put(`/api/foods/:id`, updateFood);
app.delete(`/api/foods/:id`, deleteFood);

app.listen(4000, () => console.log("Server running on 4000"));
