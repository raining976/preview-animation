const nav = document.getElementById("nav")
function addMoveClass() {
    nav.classList.add("nav-move")
}

nav.addEventListener("click", addMoveClass)

const navEle = nav.getElementsByTagName("*")

for (let i = 0; i < navEle.length; i++) {
    navEle[i].addEventListener('click', (event) => {
        event.stopPropagation();
        nav.classList.add("nav-move")
    });
}
document.addEventListener("click", (e) => {
    if (e.target != nav)
        nav.classList.remove("nav-move")
})
