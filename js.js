 // add values to input
    function appendValue(value) {
      document.getElementById("display").value += value;
    }

    // clear input
    function clearDisplay() {
      document.getElementById("display").value = "";
    }

    // evaluate expression
   function calculate() {
    let display = document.getElementById("display");
    try {
    display.value = eval(display.value);
  } catch {
    alert("This calculation is invalid");
    display.value = "Math Error"; // show error in input
  }
  }

