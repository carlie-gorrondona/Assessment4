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


document.getElementById("submit").onclick = function () {

    axios.get("http://localhost:4000/api/todolist/")
        .then(function (response) {
            const data = response.data;
        })
}


function submitItem (event) {
    event.preventDefault();

    let toDoListItem = document.querySelector('#todolist');

    let bodyObj = {
        toDoListItem: toDoListItem.value,
    }
    
    createToDoItem(bodyObj);

    toDoListItem.value = '';
}



const orderedList = document.querySelector('ol');

const createToDoItem = (item) => {

    const toDoItem = document.createElement('li');

    toDoItem.innerHTML = `<p>${item.toDoListItem}</p>
    <div class="checkbox">
    <input type="checkbox"><label>Completed</label>
    </div>`;
    orderedList.appendChild(toDoItem);

}

const form = document.querySelector('form');

form.addEventListener("submit", submitItem);