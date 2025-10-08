const display = document.getElementById("display");
const historyDiv = document.getElementById("history");
const clickSound = document.getElementById("clickSound");

// Add value
function appendValue(val){
  const lastChar = display.value.slice(-1);
  if("+-*/".includes(val) && "+-*/".includes(lastChar)) return;
  display.value += val;
  playClick();
}

// Clear
function clearDisplay(){ display.value=""; playClick(); }

// Backspace
function backspace(){ display.value = display.value.slice(0,-1); playClick(); }

// Calculate
function calculate(){
  const expr = display.value;
  if(!/^[0-9+\-*/.() ]+$/.test(expr) || expr===""){ display.value="Math Error"; return; }
  try{
    const result = new Function(`return ${expr}`)();
    if(!isFinite(result)) throw new Error();
    display.value=result;
    addToHistory(expr,result);
  }catch{ display.value="Math Error"; }
  playClick();
}

// Add to history
function addToHistory(expr,result){
  const entry=document.createElement("p");
  entry.textContent=`${expr} = ${result}`;
  historyDiv.prepend(entry);
}

// Change theme
function changeTheme(theme){ document.body.className = theme; }

// Click sound
function playClick(){ clickSound.currentTime=0; clickSound.play(); }

// Keyboard support
document.addEventListener("keydown", e=>{
  const key=e.key;
  if(!isNaN(key) || ['+','-','*','/','.'].includes(key)) appendValue(key);
  else if(key==="Enter"){ e.preventDefault(); calculate(); }
  else if(key==="Backspace") backspace();
  else if(key.toLowerCase()==="c") clearDisplay();
});
