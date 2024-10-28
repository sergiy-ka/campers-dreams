import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import DetailPage from "./pages/DetailPage/DetailPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:id" element={<DetailPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
