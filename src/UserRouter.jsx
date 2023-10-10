import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Layout from "./components/Layout/Layout";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default UserRouter;
