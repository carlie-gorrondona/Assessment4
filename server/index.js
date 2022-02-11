const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

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

  const fortune = ["You will pass this assessment", "Today, something good will happen to you", "I see a Web Development job in your future", "A faithful friend is a strong defense", "A person is never to (sic) old to learn"];

  let randomIndex = Math.floor(Math.random() * fortune.length);
  let randomFortune = fortune[randomIndex];

  res.status(200).send(randomFortune);
})




app.listen(4000, () => console.log("Server running on 4000"));
