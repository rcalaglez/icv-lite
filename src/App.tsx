import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ResumeEditor } from "./components/ResumeEditor";
import ProfileList from "./components/ProfileList";
import MainLayout from "./components/layout/MainLayout";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <MainLayout>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <ProfileList />
              </motion.div>
            </MainLayout>
          }
        />
        <Route
          path="/profile/:profileId"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <ResumeEditor />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;