const nameEl = document.getElementById("name");
const addressEl = document.getElementById("address");
const phoneEl = document.getElementById("phone-number");
let isPhoneValid = false;
const msgRow = document.getElementById("msg-row");

// Add click event to the button "Create"
document.getElementById("create-btn").addEventListener("click", function () {
    if (!isPhoneValid) {
        console.log("Please enter valid input");
        msgRow.setAttribute("class", "row bg-warning my-3 mx-5 p-2");
        document.getElementById("msg").innerHTML = "Invalid Phone number!";
    } else {
        console.log("Customer name: ", nameEl.value);
        console.log("Address: ", addressEl.value);
        console.log("Phone: ", phoneEl.value);
    }
});

phoneEl.addEventListener("focusout", function (event) {
    /*
    // Numbers with length of 10 digits
    const phoneno = /^\d{10}$/;
    */
    // Numbers of any length
    const phoneno = /\d+/g; 
    if (phoneEl.value.match(phoneno)) {
        msgRow.setAttribute("class", "row d-none");
        event.target.style.background = "white";
        event.target.style.color = "black";
        isPhoneValid = true;
    } else {
        event.target.style.background = "yellow";
        event.target.style.color = "red";
    }
    return isPhoneValid;
});

