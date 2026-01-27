import { Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import DesignSystem from "./pages/design-system/DesignSystem";
import Pensioni from "./pages/pensioni/Pensioni";
import Energia from "./pages/energia/Energia";
import Istruzione from "./pages/istruzione/Istruzione";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pensioni" element={<Pensioni />} />
        <Route path="/energia" element={<Energia />} />
        <Route path="/istruzione" element={<Istruzione />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Route>
    </Routes>
  );
}

export default App;
