// Programación síncrona
const firstName = "Pedro";
const greet = "¡Hola!";
console.log(`${greet} ${firstName}`);

// Programación asíncrona 
const firstCall = () => {
    return "Primer llamado";
};

const secondCall = () => {
    console.log("Segundo llamado");
};

const thirdCall = () => {
    return "Tercer llamado";
};

console.log(firstCall());
setTimeout(secondCall, 2000);
console.log(thirdCall());

// // callbacks
const data = [1,2,3,4,5];
const filteredData = data.filter((num) => num<4);
console.log(filteredData);

setTimeout(() => {
    console.log("primero");
    setTimeout(() => {
        console.log("segundo");
        setTimeout(() => {
            console.log("tercero");
        }, 1000);
    }, 2000);
}, 1000);

// Promises
// Estados de una promesa: pending, fullfiled, rejected
const coffeeDrinked = false;
const myPromise = new Promise((resolve, reject) => {
    if(coffeeDrinked){
        resolve(false);
    }else{
        reject("Todavía no he bebido café");
    }
});

const awake = new Promise((resolve, reject) => {
    if(coffeeDrinked){
        resolve("estoy despierto");
    }else{
        reject("me duermo");
    }
});

const failure = (error) => {
    console.log(error);
}

myPromise.then(success).then((data) => {console.log(data)}).catch(error => {console.log(error)}).finally(() => {console.log("esto siempre se ejecuta")});

Promise.all([myPromise, awake]).then(data => console.log(data)).catch(error => console.log(error));

const post1 = fetch('https://jsonplaceholder.typicode.com/todos/1');
const post2 = fetch('https://jsonplaceholder.typicode.com/todos/2');
Promise.all([post1, post2])
    .then(data => {return Promise.all(data.map(response => response.json()))})
    .then(jsonResponse => console.log(jsonResponse))
    .catch(error => console.error(error));

// Async await
const myCall = async () => {
    try{
        const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        if(!data.ok){
            throw new Error("Error al realizar la petición inicial");
        }
        const formattedData = await data.json();
        console.log(formattedData);
    }catch(error){
        console.error(error);
    }
}

// myCall();

const getTodo = async (todoId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    const data = await response.json();
    return data;
};

const getAllTodos = async () => {
    const todoIds = [1,2,3,4,5];
    const todoPromises = todoIds.map(async (todoId) => {
        const todo = await getTodo(todoId);
        return todo;
    });

    const todoData = await Promise.all(todoPromises);
    console.log(todoData);
};

getAllTodos();