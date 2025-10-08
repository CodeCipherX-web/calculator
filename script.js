const display = document.getElementById("display");
const historyDiv = document.getElementById("history");
const clickSound = document.getElementById("clickSound");

// 🔢 Add values
function appendValue(val) {
  display.value += val;
  playClick();
}

// 🧼 Clear
function clearDisplay() {
  display.value = "";
  playClick();
}

// ⌫ Backspace
function backspace() {
  display.value = display.value.slice(0, -1);
  playClick();
}

// 🧮 Calculate
function calculate() {
  let expression = display.value;
  if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
    display.value = "Math Error";
    return;
  }
  try {
    let result = new Function(`return ${expression}`)();
    if (!isFinite(result)) throw new Error();
    display.value = result;
    addToHistory(expression, result);
  } catch {
    display.value = "Math Error";
  }
  playClick();
}

// 📜 Add to history
function addToHistory(expr, result) {
  const entry = document.createElement("p");
  entry.textContent = `${expr} = ${result}`;
  historyDiv.prepend(entry);
}

// 🌓 Change Theme
function changeTheme(theme) {
  document.body.className = theme;
}

// 🔊 Click Sound
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// ⌨ Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});
