const counter = document.querySelector("#counter");
let count = 3;
counter.innerHTML = count;
count--;
const interval = setInterval(function () {
    counter.innerHTML = count;
    count--;
    if (count <= 0) {
        clearInterval(interval);
        window.location = document.querySelector(".link").href;
    }
}, 1000);
