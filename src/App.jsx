import { Link } from 'react-router-dom';
import {usePoems} from "@/context/usePoems.jsx";
import Navbar from '@/components/Navbar.jsx';

function App() {

  const { poems } = usePoems();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-slate-900 dark:to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 font-serif mb-6">
          Share Your Soul in Verse
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          A sanctuary for poets. Post your work, get thoughtful AI feedback from Lyra the Muse,
          discover kindred spirits in classic poetry, and grow together.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-purple-700 dark:bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-800 dark:hover:bg-purple-500 transition shadow-lg">
            Start Writing
          </button>
          <button className="border-2 border-purple-700 dark:border-purple-400 text-purple-700 dark:text-purple-400 px-8 py-4 rounded-full text-lg hover:bg-purple-700 dark:hover:bg-purple-600 hover:text-white dark:hover:text-white transition">
            Meet Lyra the Muse
          </button>
        </div>
      </section>

      {/* Latest Poems Feed */}
      {/* Latest Poems Feed */}
<section className="max-w-7xl mx-auto px-6 py-16">
  <h3 className="text-4xl font-serif font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
    Latest Poems ({poems.length})
  </h3>
  {poems.length === 0 ? (
    <p className="text-center text-gray-600 dark:text-gray-400 text-xl">
      No poems yet — be the first to write one! ✍️
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {poems.map((poem) => (
        <div
  key={poem.id}
  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl dark:hover:shadow-purple-900/50 transition transform hover:-translate-y-2 flex flex-col"
>
  <h4 className="text-2xl font-serif font-semibold text-purple-700 dark:text-purple-400 mb-4">
    {poem.title}
  </h4>
  <pre className="text-gray-700 dark:text-gray-300 italic leading-relaxed font-light whitespace-pre-wrap flex-1">
    {poem.content}
  </pre>
  <div className="mt-8 flex justify-between items-center">
    <p className="text-sm text-gray-500 dark:text-gray-500 italic">
      — {poem.author}
    </p>
    <Link
      to="/lyra"
      state={{ poemToReview: `${poem.title}\n\n${poem.content}` }}
      className="bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition shadow-md"
    >
      Ask Lyra to Review
    </Link>
  </div>
</div>
      ))}
    </div>
  )}
</section>

      <footer className="bg-gray-900 dark:bg-black text-white py-12 text-center mt-20">
        <p className="text-lg">© 2026 VerseHaven • Crafted with love and poetry</p>
      </footer>
    </div>
  );
}

export default App;