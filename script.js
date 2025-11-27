const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");


const allowedKeys = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", 
  "+", "-", "*", "/", "%", "=", "Enter", "Backspace", "Escape"
];


function calculate(input) {
  
  
  if (input === "=" || input === "Enter") {
    
    if (display.value !== "") {
      display.value = eval(display.value);
    }
  } 
  

  else if (input === "AC" || input === "Escape") {
    display.value = "";
  } 
  
  
  else if (input === "DEL" || input === "Backspace") {
   
    display.value = display.value.toString().slice(0, -1);
  } 
  
  
  else if (input === "%") {
     display.value = eval(display.value) / 100;
  }

  
  else {
    if (display.value === "" && (input === "*" || input === "/" || input === "+")) {
      return; 
    }
    
    display.value += input;
  }
}


buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // We send the 'data-value' from the HTML button to our logic function
    calculate(e.target.dataset.value);
  });
});


document.addEventListener("keydown", (e) => {
 
  if (allowedKeys.includes(e.key)) {
    e.preventDefault(); 
    calculate(e.key);
  }
});