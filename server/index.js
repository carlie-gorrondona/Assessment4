const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.


let globalID = 1; 

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});

app.get('/api/fortune', (req, res) => {
  //array that holds fortunes
  const fortune = ["You will pass this assessment", "Today, something good will happen to you", "I see a Web Development job in your future", "A faithful friend is a strong defense", "A person is never too old to learn"];

  //randomizes index of fortune array to get random phrase
  let randomIndex = Math.floor(Math.random() * fortune.length);
  let randomFortune = fortune[randomIndex];

  res.status(200).send(randomFortune);
})

//object to save an array of to-do list items and completed list items
let listObj = {
  todo: [], 
  complete: [],
};

app.post('/api/todolist', (req, res) => {
  //destructures toDoListItem from bodyObj in submitItem function (main.js)
  let {toDoListItem} = req.body;

  //new object to save new list item to
  let newItem = {
    id: globalID,
    toDoListItem
  }

  //pushes new list item into listObj.todo
  listObj.todo.push(newItem);
  res.status(200).send(listObj);
  globalID++;
})

app.delete('/api/todolist/:id/', (req, res) => {
  //sets variables equal to the id param in the URL
  let id = +req.params.id;

  //removes item from listObj.todo that equals id from URL; remaining items are saved to listObj.todo
  listObj.todo = listObj.todo.filter(item => item.id !== id);

  //removes item from listObj.complete; remaining items are saved to listObj.complete
  listObj.complete = listObj.complete.filter(item => item.id !== id);

  res.status(200).send(listObj);
})

app.put('/api/todolist/:id', (req, res) => {
  //sets variable equal to the id param in the URL
  let id = +req.params.id;
  
  //locates completed item in listObj.todo and saves it to listObj.complete
  let complete = listObj.todo.filter(item => item.id === id);
  listObj.complete = listObj.complete.concat(complete);

  //removes item from listObj.todo that equals id from URL; remaining items are saved to listObj.todo
  listObj.todo = listObj.todo.filter(item => item.id !== id);

  res.status(200).send(listObj);
})


app.listen(4000, () => console.log("Server running on 4000"));
