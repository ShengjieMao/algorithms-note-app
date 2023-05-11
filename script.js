// set the share form visibility
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".algo-form");
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Record a note";
  }
});

// see how long the note has been recorded
function calcNoteTime(year) {
  const currentYear = new Date().getFullYear();
  const time = currentYear - year;
  if (time >= 0) {
    return time;
  } else {
    return "Impossible year"; // check validity of created year
  }
}

let votesExpertised = 3;
let votesHard = 5;
let votesUnderstand = 4;
const totalMastered = votesExpertised + votesUnderstand;

if (votesHard) {
  alert("May need more practice on this topic"); // pop up window alert
} else {
  console.log("a message");
}

const message =
  totalMastered > votesHard ? "Good job" : "Practice more on this"; // the so called ternary operator

alert(message);
