const toggle = document.getElementById("themetoggle");
const body = document.body;
toggle.addEventListener("click", ()=>{
    body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        body.classList.contains("dark")? "dark": "light"
    );
});

if(localStorage.getItem("theme") === "dark"){
    body.classList.add("dark");
}
