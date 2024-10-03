import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddRecipe from "./components/AddRecipe";
import { RecipeList } from "./components/RecipeList";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
