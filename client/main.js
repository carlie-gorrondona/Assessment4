
document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

document.getElementById("fortuneButton").onclick = function () {

    axios.get("http://localhost:4000/api/fortune/") 
        .then(function (response) {
            const data = response.data
            alert(data);
        })
}

//endpoints and callback
const callback = ({data:todolist}) => displayLists(todolist);
const createTodolist = body => axios.post("http://localhost:4000/api/todolist/", body).then(callback);
const deleteItem = id => axios.delete(`http://localhost:4000/api/todolist/${id}`).then(callback);
const completedItem = id => axios.put(`http://localhost:4000/api/todolist/${id}`).then(callback);

function submitItem (event) {
    //clears text box after clicking "Submit"
    event.preventDefault();

    let toDoListItem = document.querySelector('#todolist');

    //creates object to store req.body
    let bodyObj = {
        toDoListItem: toDoListItem.value,
    }
    
    createTodolist(bodyObj);

    //resets value of toDoListItem to empty string so it can take in the next item
    toDoListItem.value = '';
}


const orderedList = document.querySelector("#todo");
const compOrderedList = document.querySelector("#complete")


const createToDoItem = (item) => {
    //creates new list item in HTML
    const toDoItem = document.createElement('li');

    //adds data to HTML li and includes a completed and delete button
    toDoItem.innerHTML = `<p>${item.toDoListItem}</p>
    <div class="options">
    <button onclick="completedItem(${item.id})">Completed</button>
    <button onclick="deleteItem(${item.id})">Delete</button>
    </div>`;
    orderedList.appendChild(toDoItem);
}


function createCompletedItem (item) {
    //creates new list item in HTML
    const completedItem = document.createElement('li');

    //adds data to HTML li and includes a delete button
    completedItem.innerHTML = `<p>${item.toDoListItem}</p>
    <div class="options">
    <button onclick="deleteItem(${item.id})">Delete</button>
    </div>`;
    compOrderedList.appendChild(completedItem);
}


function displayLists(obj) {
    //resets data in ordered list to empty string to prevent duplicates
    orderedList.innerHTML = ``;
    compOrderedList.innerHTML = ``;

    //loops through object's array of objects and sends each index to createToDoItem function
    for (let i = 0; i < obj.todo.length; i++) {
        createToDoItem(obj.todo[i])
    }

    //loops through object's array of objects and sends each index to createCompletedItem function
    for (let i = 0; i < obj.complete.length; i++) {
        createCompletedItem(obj.complete[i])
    }
}


const form = document.querySelector('form');

form.addEventListener("submit", submitItem);