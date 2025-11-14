/* ========================================================
   GLOBALS & INITIAL SETUP
======================================================== */
let agentName = null;
let typingSpeed = 25;  // 20–30 ms per character = medium speed

const output = document.getElementById("output");
const input = document.getElementById("commandInput");
const glitch = document.getElementById("glitch");
const bootScreen = document.getElementById("boot-screen");
const bootText = document.getElementById("boot-text");
const sparkleContainer = document.getElementById("sparkle-container");


/* ========================================================
   TYPEWRITER EFFECT
======================================================== */
function typeText(text, callback = null) {
  let i = 0;

  function type() {
    if (i < text.length) {
      output.innerHTML += text.charAt(i);
      output.scrollTop = output.scrollHeight;
      i++;
      setTimeout(type, typingSpeed);
    } else {
      output.innerHTML += "\n";
      if (callback) callback();
    }
  }

  type();
}


/* ========================================================
   PRINT (USING TYPEWRITER)
======================================================== */
function print(text, callback = null) {
  typeText(text + "\n", callback);
}


/* ========================================================
   GLITCH FLASH EFFECT
======================================================== */
function glitchFlash() {
  glitch.style.display = "block";
  setTimeout(() => (glitch.style.display = "none"), 300);
}


/* ========================================================
   MISSION COMPLETION CHECKMARK
======================================================== */
function completeMission(id) {
  const mission = document.getElementById(id);
  if (!mission.classList.contains("completed")) {
    mission.classList.add("completed");
  }
}


/* ========================================================
   COMMAND HANDLER
======================================================== */
function runCommand(raw) {
  let cmd = raw.toLowerCase();

  // PERSONALIZATION COMMAND
  if (cmd.startsWith("set name ")) {
    const name = raw.substring(9).trim();

    if (name.length > 0) {
      agentName = name;
      print(`Welcome, Agent ${agentName}. Your brilliance is now registered with the ROAR Sisterhood.`);
    } else {
      print("Usage: set name YourName");
    }
    return;
  }

  switch (cmd) {

    case "help":
      print("Available commands:\nscan\nlogin\nlogin sparkle-admin\ndecode\nfirewall status\noverride firewall\ntrace\nempower\nmission\nreveal\npinkcat\nset name <yourname>");
      break;

    case "scan":
      print(
        "Scanning for barriers...\n" +
        "Barrier_1: Self-doubt.exe\n" +
        "Barrier_2: NoGirlsAllowed.sys\n" +
        "Barrier_3: HiddenOpportunities.dll\n" +
        "FLAG{SCAN_COMPLETE_ROAR}"
      );
      completeMission("m1");
      break;

    case "login":
      print("Access Denied.\nHint: try 'login sparkle-admin'");
      break;

    case "login sparkle-admin":
      print("ACCESS GRANTED\nWelcome, Sparkle Administrator.\nFLAG{ACCESS_GRANTED_PINK}");
      completeMission("m2");
      break;

    case "decode":
      print("Decrypting...\nCipher: JLUVV\nDecoded: GIRLS\nMessage: GIRLS IN STEM ARE UNSTOPPABLE.");
      completeMission("m3");
      break;

    case "firewall status":
      print("Firewall ACTIVE\nWeakness: Old stereotypes\nUse 'override firewall'");
      break;

    case "override firewall":
      glitchFlash();
      print(
        "Overriding firewall...\n" +
        "Loading courage...\n" +
        "Loading confidence...\n" +
        "Loading brilliance...\n" +
        "FIREWALL DESTROYED\n" +
        "FLAG{FIREWALL_OVERRIDDEN}"
      );
      completeMission("m4");
      break;

    case "trace":
      print("Tracing cause...\nSource: Fear of Not Being Enough\nCounteraction: run 'empower'");
      completeMission("m5");
      break;

    case "empower":
      print(
        "EMPOWERMENT BOOST ACTIVATED\n" +
        "- You are brilliant.\n" +
        "- You belong in STEM.\n" +
        "- You can solve anything.\n" +
        "FLAG{YOU_ARE_LIMITLESS}"
      );
      completeMission("m6");
      break;

    case "mission":
      print(
        "MISSION OBJECTIVES:\n" +
        "1. scan\n" +
        "2. login sparkle-admin\n" +
        "3. decode\n" +
        "4. override firewall\n" +
        "5. trace\n" +
        "6. empower\n" +
        "7. reveal"
      );
      break;

    case "reveal":
      if (agentName) {
        print(`MISSION COMPLETE\nAgent ${agentName}, you destroyed the Digital Barrier.\nFINAL FLAG: {ROAR_GIRLPOWER_2025}`);
      } else {
        print("MISSION COMPLETE\nYou destroyed the Digital Barrier.\nFINAL FLAG: {ROAR_GIRLPOWER_2025}");
      }
      completeMission("m7");
      break;

    case "pinkcat":
      print(" /\\_/\\\n( •‿• )\n > ^ <");
      break;

    default:
      print("Unknown command. Type 'help'.");
  }
}


/* ========================================================
   INPUT LISTENER (ENTER KEY)
======================================================== */
document.addEventListener("DOMContentLoaded", () => {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let value = input.value.trim();

      print("> " + value, () => runCommand(value));

      input.value = "";
    }
  });
});


/* ========================================================
   THEME SWITCHER
======================================================== */
const themeButtons = document.querySelectorAll("#theme-switcher button");

themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.body.className = "";
    document.body.classList.add("theme-" + btn.dataset.theme);
  });
});


/* ========================================================
   FLOATING SPARKLES GENERATOR
======================================================== */
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = window.innerHeight + "px";
  sparkle.style.animationDuration = (3 + Math.random() * 4) + "s";

  sparkleContainer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 7000);
}

setInterval(createSparkle, 300);


/* ========================================================
   BOOT-UP ANIMATION
======================================================== */
const bootLines = [
  "Booting ROAR OS...",
  "Loading Girl Power Modules...",
  "Loading Confidence Engine...",
  "Loading Opportunity Scanner...",
  "System Ready."
];

let bootIndex = 0;

function runBootSequence() {
  if (bootIndex < bootLines.length) {
    bootText.textContent += bootLines[bootIndex] + "\n";
    bootIndex++;
    setTimeout(runBootSequence, 700);
  } else {
    setTimeout(() => {
      bootScreen.style.opacity = "0";
      setTimeout(() => bootScreen.style.display = "none", 800);
    }, 700);
  }
}

runBootSequence();
