import { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes = sessionStorage.getItem("notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleChange = (e) => {
    setNotes(e.target.value);
    sessionStorage.setItem("notes", e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 bg-[#F1C75B] row-span-3 p-4 rounded-2xl">
      <h1 style={{ font: "Roboto" }} className="text-black text-3xl font-bold">
        All notes
      </h1>
      <textarea
        className="w-full h-full p-2 border-2 rounded-lg"
        name="notes"
        id="notes"
        placeholder="This is how I am going to learn MERN Stack in next 3 months."
        value={notes}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
