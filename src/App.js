import "./style.css";
import { useEffect, useState } from "react";
import supabase from "./supabase";

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

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Data Structure Memo";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Note logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? " Close" : "Record a note"}
      </button>
    </header>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCate, setCurrentCate] = useState("all");

  useEffect(
    function () {
      async function getNotes() {
        setIsLoading(true);

        let query = supabase.from("notes").select("*");
        if (currentCate !== "all") {
          query = query.eq("category", currentCate);
        }

        const { data: notes, error } = await query.order("votesExpert", {
          ascending: false,
        });

        if (!error) setNotes(notes);
        else alert("Something wrong with fetching data");
        setIsLoading(false);
      }
      getNotes();
    },
    [currentCate]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewNoteForm setNotes={setNotes} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCate={setCurrentCate} />
        {isLoading ? (
          <Loader />
        ) : (
          <NoteList notes={notes} setNotes={setNotes} />
        )}
      </main>
    </>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewNoteForm({ setNotes, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. prevent browser reload
    e.preventDefault();

    // 2. check if data is valid
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      /*
      // 3. create new note object
      const newNote = {
        id: 1,
        text,
        source,
        category,
        votesExpert: 0,
        votesFine: 0,
        votesHard: 0,
        createdIn: new Date().getFullYear(),
      };
      */

      // 3. create new note to supabase
      setIsUploading(true);
      const { data: newNote, error } = await supabase
        .from("notes")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. add new note to the UI with call back function
      if (!error) setNotes((notes) => [newNote[0], ...notes]);
      // 5. reset input field
      setText("");
      setSource("");
      setCategory("");
      // 6. close the form
      setShowForm(false);
    }
  }

  return (
    <form className="algo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Record a note of data strcture or algorithms"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="link to source"
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Add
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCate }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCate("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCate(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function NoteList({ notes, setNotes }) {
  if (notes.length === 0) {
    return (
      <p className="message">
        No records for this category yet. Note the first one!
      </p>
    );
  }

  return (
    <section>
      <ul className="notes-list">
        {notes.map((note) => (
          // need the key here because it should be immediately after the first element*/
          <Note key={note.id} note={note} setNotes={setNotes} />
        ))}
      </ul>
      <p>There are {notes.length} notes recorded</p>
    </section>
  );
}

function Note({ note, setNotes }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isTroubled = note.votesFine + note.votesExpert < note.votesHard;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedNote, error } = await supabase
      .from("notes")
      .update({ [columnName]: note[columnName] + 1 })
      .eq("id", note.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setNotes((notes) =>
        notes.map((n) => (n.id === note.id ? updatedNote[0] : n))
      );
  }

  // the note param is the children component from the parent one in noteList
  return (
    <li className="note">
      <p>
        {isTroubled ? <span className="troubled">[Troublesome 👀]</span> : null}
        {note.text}
        <a className="source" href={note.source} target="_blank">
          (Source)
        </a>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === note.category
            ).color,
          }}
        >
          {note.category}
        </span>
      </p>
      <div className="vote-buttons">
        <button onClick={() => handleVote("votesHard")} disabled={isUpdating}>
          😰 {note.votesHard}
        </button>
        <button onClick={() => handleVote("votesFine")} disabled={isUpdating}>
          😏 {note.votesFine}
        </button>
        <button onClick={() => handleVote("votesExpert")} disabled={isUpdating}>
          🥳 {note.votesExpert}
        </button>
      </div>
    </li>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button
        className="btn btn-large"
        onClick={() => setCount((count) => count + 1)}
      >
        +1
      </button>
    </div>
  );
}

export default App;
