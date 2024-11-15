import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://www.omdbapi.com/?apikey=7011d6e4';

function FetchMovie() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getData = async (title) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await axios.get(`${API}&t=${title}`);
      setData(res.data);
      if (res.data.Response === 'False') {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.error('Error fetching the movie data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      getData(searchTerm);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-rose-500 mb-6">Search Movies</h1>

      <form onSubmit={handleSearch} className="w-full max-w-md mb-6 flex">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none"
        />
        <button
          type="submit"
          className="bg-rose-500 text-white px-4 py-2 rounded-r hover:bg-rose-600"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}

      {isError && (
        <div className="text-red-500 font-semibold">
          No movie found. Please try again.
        </div>
      )}

      {!isLoading && !isError && data && (
        <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-2">{data.Title}</h2>
          <p className="text-gray-600 mb-1">Year: {data.Year}</p>
          <p className="text-gray-600 mb-1">Genre: {data.Genre}</p>
          <p className="text-gray-600">Plot: {data.Plot}</p>
        </div>
      )}
    </div>
  );
}

export default FetchMovie;
