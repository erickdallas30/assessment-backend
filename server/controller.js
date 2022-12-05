const foods = require("./db.json");
let newID = 7;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      "A beautiful, smart, and loving person will be coming into your life",
      "A lifetime friend shall soon be made",
      "A pleasant surprise is waiting for you",
      "Accept something that you cannot change, and you will feel better",
      "All your hard work will soon pay off",
      "Believe it can be done",
      "Congratulations! You are on your way",
      "Dont expect romantic attachments to be strictly logical or rational",
      "Dont just spend time. Invest it",
      "Embrace this love relationship you have!",
    ];
    let randomF = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomF];

    res.status(200).send(randomFortune);
  },

  //4 controller functions for favorite food list

  getFoods: (req, res) => res.status(200).send(foods),
  
  createFood: (req, res) => {
    let { title, rating, imageURL } = req.body;
    let newFood = {
      id: newID,
      title,
      rating,
      imageURL,
    };
    foods.push(newFood);
    res.status(200).send(foods);
    newID++;
  },

  updateFood: (req, res) => {
    let { id } = req.params;
    let { type } = req.body;
    let index = foods.findIndex((elem) => +elem.id === +id);

    if (foods[index].rating === 5 && type === "plus") {
      res.status(400).send("cannot go above 5");
    } else if (foods[index].rating === 0 && type === "minus") {
      res.status(400).send("cannot go below 0");
    } else if (type === "plus") {
      foods[index].rating++;
      res.status(200).send(foods);
    } else if (type === "minus") {
      foods[index].rating--;
      res.status(200).send(foods);
    } else {
      res.sendStatus(400);
    }
  },

  deleteFood: (req, res) => {
    let index = foods.findIndex((elem) => elem.id === +req.params.id);
    foods.splice(index, 1);
    res.status(200).send(foods);
  }
};
