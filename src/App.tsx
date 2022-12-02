import Header from "components/Header/Header";
import MovieCard from "components/MovieCard/MovieCard";
import SearchBox from "components/SearchBox/SearchBox";
import { getMovies } from "features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "hooks/storeHook";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const { darkTheme, movies } = useAppSelector((state) => state);
  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const searchMovies = movies.data?.results.filter((movie) => {
    if (!searchText.length) return movie;
    if (!movie.title) return "";
    return movie.title.toLowerCase().includes(searchText);
  });
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-yellow-500 dark:bg-cyan-900 dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        <Header />
        <div className="mb-12 flex items-center justify-between">
          <SearchBox setSearchText={setSearchText} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {searchMovies &&
            searchMovies.map((movie) => {
              const { id, title, overview, poster_path } = movie;
              return (
                <MovieCard
                  key={id}
                  title={title}
                  overview={overview}
                  poster_path={
                    "https://image.tmdb.org/t/p/original" + poster_path
                  }
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
