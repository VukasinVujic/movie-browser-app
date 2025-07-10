import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieSearch from "./components/MovieSearch";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
