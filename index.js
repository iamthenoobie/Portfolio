delayDisplay();

async function delayDisplay() {
  let delayTextOne = new Promise(function(resolve) {
    setTimeout(function() {resolve("Welcome!");}, 700);
  });
  let delayTextTwo = new Promise(function(resolve) {
    setTimeout(function() {resolve("Starting the server...");}, 1400);
  });
  let delayTextThree = new Promise(function(resolve) {
    setTimeout(function() {resolve('Type <span class="code">help</span> for a list of supported commands.');}, 2100);
  });
  setTimeout(() => {document.getElementById("inputTerminal").style.display = "block"}, 2800);
  document.getElementById("welcomeText").innerHTML = await delayTextOne;
  document.getElementById("serverText").innerHTML = await delayTextTwo;
  document.getElementById("helpText").innerHTML = await delayTextThree;
}

let userInput, terminalOutput;

const app = () => {
  window.userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
};

const execute = function executeCommand(input) {
  let output;
  input = input.toLowerCase();

  if (input.length === 0) {
    return;
  }

  // "Secret" party command
  if (input === "party") {
    startTheParty();
  }

  // Another "Secret" command
  if (input === "sudo rm -rf") {
    whooops();
  }

  output = `<div class="terminal-line"><span class="danger">root@user:~$</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">no such command: <span class="output">"${input}"</span></div>`;
  } else {
    output += `<div class="output"> ${COMMANDS[input]} </div>`;
  }

  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
  userInput = document.getElementById("userInput");
  const input = window.userInput.innerHTML;

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);

// TOP SECRET, DON'T READ
const startTheParty = () => {
  var confettiSettings = {
    target: "canvas",
    max: "1000",
    size: "1",
    animate: true,
    props: ["square", "triangle", "line"],
    colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
    clock: "25",
    rotate: true,
    /*width: "1680",
    height: "971",*/
    start_from_edge: true,
    respawn: false
  };
  var confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
};

const whooops = () => {
  document.body.querySelector(".hero").remove();
  document.body.style.background = "#000";
  document.body.style.width = "100vw";
  document.body.style.height = "100vh";
};

const COMMANDS = {
  help:
    'Supported commands: ["<span class="code">about</span>", "<span class="code">education</span>", "<span class="code">skills</span>", "<span class="code">contact</span>"]',
  about:
    "Specializing in Threats and Vulnerability Management, proficient in Qualys, Nmap, and Burp Suite. Actively expanding knowledge in Vulnerability Assessment and Penetration Testing to enhance system security. Dedicated to securing digital spaces against potential risks as a CyberSecurity Analyst at TCS with 2 years' experience.",
  skills:
    "Threats and vulnerability management | Qualys | Burp Suite | Nmap | OWASP",
  education:
    "Master of Science in Data Science at Vellore Institute of Technology.",
  /*experience:"I'm currently working as a front-end developer at Storm Digital. My main areas of focus are helping our creative team build succesful digital creatives, and developing A/B tests for our CRO team.",*/
  contact:
    'You can contact me on the following link:<br>["<a target="_blank" rel="linkedin" href="https://www.linkedin.com/in/premkumar-?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" class="social link">Linkedin</a>"]',
  party: "🎉🎉🎉",
  /*bob: "<span style='font-size: 2rem;'>🐕</span>",
  beer:'["<a target="_blank" rel="noopener noreferrer" href="#" class="social link">Anytimers!</a>"]',*/
  "sudo rm -rf": ""
};
