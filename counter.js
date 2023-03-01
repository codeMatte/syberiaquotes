var counter = 0;

if (localStorage.getItem("counter")) {
  counter = localStorage.getItem("counter");
}

counter++;

localStorage.setItem("counter", counter);

document.getElementById("counter").innerHTML = counter;
