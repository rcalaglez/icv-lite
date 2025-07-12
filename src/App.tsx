import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResumeEditor } from "./components/ResumeEditor";
import ProfileList from "./components/ProfileList"; // Crearemos este componente a continuación
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/profile/:profileId" element={<ResumeEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;