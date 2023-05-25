const btn = document.querySelector(".btn-open");
const form = document.querySelector(".algo-form");
const notesList = document.querySelector(".notes-list");

const CATEGORIES = [
  { name: "Array and String", color: "#3b82f6" },
  { name: "Tree and Linked-list", color: "#16a34a" },
  { name: "Hash table", color: "#ef4444" },
  { name: "Heap and Graph", color: "#eab308" },
  { name: "Queue and Stack", color: "#db2777" },
  { name: "Binary", color: "#14b8a6" },
  { name: "Dynamic programming", color: "#f97316" },
  { name: "Recursion", color: "#8b5cf6" },
];
// toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Record a note";
  }
});

// remove all instances of notes and create DOM elements
notesList.innerHTML = "";

// Load data from supabase
loadNotes();
async function loadNotes() {
  const res = await fetch(
    "https://iefudbgadqqtjnseqkrv.supabase.co/rest/v1/notes",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZnVkYmdhZHFxdGpuc2Vxa3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5MzQ4MDUsImV4cCI6MTk5ODUxMDgwNX0.Z7JTUm2XO63f7o0tC3bPwCqUHCuK_Dv91Nkow0uLQwg",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZnVkYmdhZHFxdGpuc2Vxa3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5MzQ4MDUsImV4cCI6MTk5ODUxMDgwNX0.Z7JTUm2XO63f7o0tC3bPwCqUHCuK_Dv91Nkow0uLQwg",
      },
    }
  );
  const data = await res.json();
  createNotesList(data);
}

//console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
//console.log([7, 64, 6, -23, 11].find((el) => el > 10));

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

function createNotesList(storage) {
  // to make the function independent of the data
  const html = storage.map(
    (note) => `<li class="note">
        <p>
          ${note.text}
          <a class="source" href="${note.source}" target="_blank">(Source)</a>
        </p>
        <span class="tag" style="background-color: ${
          CATEGORIES.find((cat) => cat.name === note.category).color
        }">
          ${note.category}
        </span>
      </li>`
  );
  const htmlEl = html.join("");
  notesList.insertAdjacentHTML("afterbegin", htmlEl);
}

/*
//arrow function
const calcNoteTime2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year. Needs to be less than or equal to ${new Date().getFullYear()}`;

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
*/
