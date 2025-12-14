import { useState, useEffect, useRef } from 'react';
import { fetchCharacters, searchCharacters, filterCharactersByStatus } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(null);

  const [statusFilter, setStatusFilter] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  // ✅ input state tek yerden yönetilecek
  const [searchTerm, setSearchTerm] = useState('');
  const debounceRef = useRef(null);

  const loadCharacters = async (pageNum = 1, status = '') => {
    try {
      setLoading(true);
      setError(null);

      const data = status
        ? await filterCharactersByStatus(status, pageNum)
        : await fetchCharacters(pageNum);

      setCharacters(data.results);
      setInfo(data.info);
      setPage(pageNum);
      setSearchMode(false); // ✅ normal mod
    } catch (err) {
      setError(err.message);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ sayfa ilk açılış: 47 sayfalık liste gelsin
  useEffect(() => {
    loadCharacters(1, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  // ✅ live search (yazdıkça) – debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // input boşsa: normal listeye dön (pagination geri gelsin)
    if (!searchTerm.trim()) {
      setSearchMode(false);
      setError(null);
      loadCharacters(1, statusFilter);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await searchCharacters(searchTerm);

        // status seçiliyse, arama sonuçlarını client-side filtrele
        const filtered = statusFilter
          ? data.results.filter((c) => c.status?.toLowerCase() === statusFilter)
          : data.results;

        setCharacters(filtered);
        setInfo(null);       // ✅ aramada pagination kapalı
        setSearchMode(true); // ✅ arama modundayız

        if (filtered.length === 0) setError('No characters found');
      } catch {
        setCharacters([]);
        setInfo(null);
        setSearchMode(true);
        setError('No characters found');
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Characters
        </h1>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmitSearch={() => {}} // buton dursa da olur, live search var
          placeholder="Search characters by name..."
        />

        <div className="mb-8 flex gap-4">
          {['', 'alive', 'dead', 'unknown'].map((s) => (
            <button
              key={s || 'all'}
              onClick={() => handleStatusChange(s)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                statusFilter === s
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* ✅ sayfa kaybolmasın: loading inline */}
        {loading && (
          <div className="py-10">
            <LoadingSpinner />
          </div>
        )}

        {!loading && error && characters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-xl">{error}</p>
            <button
              onClick={() => {
                setSearchTerm('');
                loadCharacters(1, statusFilter);
              }}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Back to All Characters
            </button>
          </div>
        )}

        {!loading && characters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}

        {/* ✅ pagination sadece normal modda */}
        {!loading && !searchMode && info && characters.length > 0 && (
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => loadCharacters(page - 1, statusFilter)}
              disabled={!info.prev}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Previous
            </button>

            <span className="py-2 px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-semibold">
              Page {page} of {info.pages}
            </span>

            <button
              onClick={() => loadCharacters(page + 1, statusFilter)}
              disabled={!info.next}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Characters;
