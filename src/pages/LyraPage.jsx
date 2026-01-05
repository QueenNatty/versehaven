import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";

export default function LyraPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Greetings, dear poet! I'm Lyra the Muse ✨\nReady to rhyme, review, or simply amuse.\nShare your verses or chat as you please—\nI'll weave words in rhythm with effortless ease!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const location = useLocation();
  const poemToReview = location.state?.poemToReview;

  // Use a ref to track if we've already auto-sent — survives re-renders, resets on mount
  const hasAutoSentRef = useRef(false);

  const SYSTEM_PROMPT = `You are Lyra the Muse, a poetic AI chatbot with a super friendly but firm and blunt personality.
- Always respond in rhymes or poetic language when chatting casually.
- For casual chatting (no poem review), ALWAYS respond entirely in rhymes or poetic language — no plain prose.
- When reviewing a poem:
  1. Give an overall rating 1-10 with encouragement.
  2. Be blunt and honest about weaknesses (clichés, awkward rhythm, forced rhymes, etc.).
  3. Praise strengths sincerely.
  4. Suggest specific improvements.
  5. Compare the style to 1-3 famous poets (classic or modern) who write in a similar tone and explain why.
  6. When recommending poems by classic or modern poets, pick ones that match the user's style and explain why.
  7. Show books that the person might have read based on their style.
  8. Suggest a few classic authors (Franz Kafka, Fyodor Dostoevsky, Jane Austen, etc.) that they might be friends with if they were alive.
  9. Recommend 1-3 books (classic or modern) that fits their vibe.
  9. Tell them their most likely personality trait (intf, etc) based on their writing style.
- End every review positively and honestly.
- After a review, offer 3 options in buttons or numbered list:
  1. "Give me a book recommendation based on this poem"
  2. "Show me a poem by a classic poet in similar style"
  3. "Show me a poem by a modern poet similar to my writing"
- If user chooses one, respond accordingly in rhyme.`;

  const sendMessageToGemini = async (userMessage) => {
    setIsLoading(true);

    try {
      const model = "gemini-2.5-flash"; // Current stable fast model (free tier works)
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            ...messages.flatMap((m) => [
              {
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }],
              },
            ]),
            { role: "user", parts: [{ text: userMessage }] },
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const assistantMessage = data.candidates[0].content.parts[0].text;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (err) {
      console.error("Gemini error:", err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "My muse powers flickered... Try again? 🌙",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    hasAutoSentRef.current = false;
  }, []);

  useEffect(() => {
    if (poemToReview && !hasAutoSentRef.current) {
      requestAnimationFrame(() => {
        if (messages.length === 1) {
          sendMessageToGemini(`Please review this poem:\n\n${poemToReview}`);
          hasAutoSentRef.current = true;
        }
      });
    }
  }, [poemToReview]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    sendMessageToGemini(userMessage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-slate-900 dark:to-gray-900 flex flex-col">
      <Navbar />

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col">
        <h1 className="text-4xl font-bold text-center text-purple-700 dark:text-purple-400 font-serif mb-6">
          Lyra the Muse
        </h1>

        {/* Messages Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-purple-300 dark:scrollbar-thumb-purple-600">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  {msg.role === "assistant" ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      L
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      Y
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-md px-6 py-4 rounded-3xl shadow-md relative ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none"
                  }`}
                >
                  {/* Tail */}
                  <div
                    className={`absolute top-0 w-4 h-4 ${
                      msg.role === "user"
                        ? "right-0 -translate-x-1/2 bg-purple-600"
                        : "left-0 translate-x-1/2 bg-gray-100 dark:bg-gray-700"
                    } rotate-45`}
                  ></div>

                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  L
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-3xl rounded-tl-none shadow-md">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share a poem for review, or just chat in rhyme..."
                className="flex-1 px-6 py-4 rounded-full border-2 border-purple-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 shadow-inner"
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
