import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { usePoems } from "../context/PoemsContext.jsx";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [poem, setPoem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addPoem } = usePoems();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !poem.trim()) {
      alert("Fill in both title and poem!");
      return;
    }
    addPoem(title, poem); // This sends it to the feed
    alert("Poem posted! Check the homepage 🔥");
    setTitle("");
    setPoem("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-slate-900 dark:to-gray-900">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-gray-100 font-serif mb-4">
          Compose Your Poem
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Let the words flow. Lyra will review it when you're ready.
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
          {/* Left: Input Fields */}
          <div className="space-y-8">
            <div>
              <label className="block text-2xl font-medium text-gray-800 dark:text-gray-200 mb-3 font-serif">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Midnight Whispers"
                className="w-full px-6 py-4 text-lg border-2 border-purple-200 dark:border-gray-600 rounded-xl focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-2xl font-medium text-gray-800 dark:text-gray-200 mb-3 font-serif">
                Your Poem
              </label>
              <textarea
                value={poem}
                onChange={(e) => setPoem(e.target.value)}
                rows="16"
                placeholder="Let your soul speak..."
                className="w-full px-6 py-6 text-lg font-light leading-relaxed border-2 border-purple-200 dark:border-gray-600 rounded-xl focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none transition resize-none font-serif bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-700 dark:bg-purple-600 text-white py-5 rounded-xl text-xl font-medium hover:bg-purple-800 dark:hover:bg-purple-500 transition shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? "Posting..." : "Post Poem to VerseHaven"}
            </button>
          </div>

          {/* Right: Live Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10">
            <h2 className="text-3xl font-serif font-bold text-purple-700 dark:text-purple-400 mb-8 text-center">
              Live Preview
            </h2>
            {title || poem ? (
              <div className="space-y-6">
                <h3 className="text-3xl font-serif font-semibold text-purple-900 dark:text-purple-300">
                  {title || "Untitled Poem"}
                </h3>
                <pre className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap font-light font-serif">
                  {poem || "Your words will appear here as you type..."}
                </pre>
                <p className="text-sm text-gray-500 dark:text-gray-500 text-right italic">
                  — {title ? "You" : "A Poet"}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 dark:text-gray-600 text-center italic text-lg">
                Start typing to see your poem take shape...
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
