const note = document.querySelector(".note");
const pwd = document.querySelectorAll("input[type='password']");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    if (pwd[0].value != pwd[1].value) {
        e.preventDefault();
        note.innerText = "The passwords do not match";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,100}$/.test(pwd[0].value)) {
        e.preventDefault();
        note.innerText = "The password must be 8 to 100 characters long and have lowercase letters, uppercase letters and numbers";
    }
})