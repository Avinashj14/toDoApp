document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-box");
    const todoList = document.getElementById("todo-list");
  






    const todoItems = []; 
  
    function displayitem() {
      todoList.innerHTML = todoItems
        .map((item) => {
          return `
            <div class="listContent">
              <div class="checkbox">
                <div class="check">
                  <img src="./assets/icon-check.svg" />
                </div>
              </div>
              <div class="text">
                <p>${item}</p>
              </div>
              <div class="del">
              <img src="./assets/icon-cross.svg" />
              </div>
            </div>
          `;
        })
        .join("");


        const items = document.querySelectorAll(".listContent");
        items.forEach((item, index) => {

            //checkbox, delete button, and text div
          const checkbox = item.querySelector(".checkbox");
          const delButton = item.querySelector(".del");
          const textDiv = item.querySelector(".text");
    
          //check
          checkbox.addEventListener("click", function () {
            const checkboxImg = checkbox.querySelector("img");
            checkboxImg.classList.toggle("visible");
    
            // Apply line-through effect to the paragraph text
            if (textDiv) {
              const textParagraph = textDiv.querySelector("p");
              textParagraph.classList.toggle("completed");
            }
          });
   
   
          //del
          delButton.addEventListener("click", function () {
            item.remove();
            todoItems.splice(index, 1);
            displayitem();
          });
        });




        const sunIcon = document.querySelector(".content img");
        const backgroundImg = document.querySelector(".backgroundImg img");
        const body = document.body;
     
  sunIcon.addEventListener("click", function () {
   
    const currentSrc = sunIcon.getAttribute("src");

   
    if (currentSrc === "./assets/icon-sun.svg") {
      // Change the src attribute to moon icon
      sunIcon.setAttribute("src", "./assets/icon-moon.svg");
      backgroundImg.setAttribute("src", "./assets/bg-desktop-light.jpg");
      body.style.backgroundColor = "white"; 
    } else {
      
      sunIcon.setAttribute("src", "./assets/icon-sun.svg");
      backgroundImg.setAttribute("src", "./assets/bg-desktop-dark.jpg");
      body.style.backgroundColor = "black"; }
  });
      


      }
    
  
    displayitem();
  

    // event to add adding item 
    inputBox.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && inputBox.value !== "") {
        event.preventDefault(); 
  
        const newItemText = inputBox.value;
        todoItems.push(newItemText);
  
        displayitem();
  
        inputBox.value = "";
      }
    });
  });
  






























































































































































