import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ReactMarkdown from "react-markdown"; // For nice formatting

export default function LyraPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Greetings, dear poet, I'm Lyra the Muse,\nReady to rhyme and your verses peruse.\nShare your creation, or chat as you please—\nI'll weave words in rhythm with effortless ease! ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // ===== MOCK RESPONSE (delete this block when you add real API) =====
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Oh lovely lines you've shared with me today,\nYour words dance freely in a charming way!\nThe rhythm flows like rivers to the sea,\nA solid 8/10 — keep writing wild and free! 📝\n\nThis reminds me of Pablo Neruda's fire,\nPassionate imagery that lifts us higher.\nTry adding more sensory delight,\nSmells and touches to ignite the night.\n\nBook rec: "Twenty Love Poems and a Song of Despair" by Neruda — pure magic!`,
        },
      ]);
      setIsLoading(false);
    }, 1500);
    // ===== END MOCK =====

    // ===== REAL GROK API (uncomment when ready) =====
    // try {
    //   const res = await fetch('https://api.x.ai/v1/chat/completions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       model: 'grok-4',  // or 'grok-3' depending on your access
    //       messages: [
    //         { role: 'system', content: systemPrompt },  // We'll define this below
    //         ...messages.map(m => ({ role: m.role, content: m.content })),
    //         { role: 'user', content: userMessage }
    //       ],
    //       temperature: 0.8,
    //       max_tokens: 1000,
    //     }),
    //   });
    //
    //   const data = await res.json();
    //   const assistantMessage = data.choices[0].message.content;
    //
    //   setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    // } catch (err) {
    //   setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, my muse powers flickered... Try again?' }]);
    // } finally {
    //   setIsLoading(false);
    // }
    // ===== END REAL =====
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-slate-900 dark:to-gray-900 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 flex flex-col">
        <h1 className="text-4xl font-bold text-center text-purple-700 dark:text-purple-400 font-serif mb-8">
          Chat with Lyra the Muse
        </h1>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-lg px-6 py-4 rounded-2xl shadow-md ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-2xl shadow-md">
                  <span className="text-gray-500">
                    Lyra is weaving words...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 border-t dark:border-gray-700"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share a poem for review, or just chat in rhyme..."
                className="flex-1 px-6 py-4 rounded-full border-2 border-purple-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-600 dark:focus:border-purple-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-purple-700 dark:bg-purple-600 text-white rounded-full font-medium hover:bg-purple-800 dark:hover:bg-purple-500 transition shadow-lg disabled:opacity-70"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
