const complimentBtn = document.getElementById("complimentButton");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

complimentBtn.addEventListener("click", getCompliment);

//get fortune button request
const fortuneButton = document.getElementById("fortuneButton");

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortunes/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

fortuneButton.addEventListener("click", getFortune);

//front end request(get,post, put, delete) and functions for favorite food list

const foodBox = document.querySelector('#foodBox')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/foods`

const foodCallback = ({ data: foods }) => displayFoods(foods)
const error = err => console.log(err.response.data)

const getAllFoods = () => axios.get(baseURL).then(foodCallback).catch(error)
const createFood = body => axios.post(baseURL, body).then(foodCallback).catch(error)
const updateFood = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(foodCallback).catch(error)
const deleteFood = id => axios.delete(`${baseURL}/${id}`).then(foodCallback).catch(error)

function submitFoodInfo(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    } 

    createFood(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createFoodBox(food) {
    const foodCard = document.createElement('div')
    foodCard.classList.add('food-box')

    foodCard.innerHTML = `<img alt='food image' src=${food.imageURL} class="food-image"/>
    <p class="food-title">${food.title}</p>
    <div class="btns-container">
        <button class = "rateBtn" onclick="updateFood(${food.id}, 'minus')">-</button>
        <p class="food-rating">${food.rating} stars</p>
        <button class = "rateBtn" onclick="updateFood(${food.id}, 'plus')">+</button>
    </div>
    <button class = "deleteBtn" onclick="deleteFood(${food.id})">Remove</button>
    `


    foodBox.appendChild(foodCard)
}

function displayFoods(arr) {
    foodBox.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFoodBox(arr[i])
    }
}

form.addEventListener('submit', submitFoodInfo)

getAllFoods()

