import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsFeed from "./NewsFeed";
import ClientDashboard from "./ClientDashboard";
import AdminDashboard from "./AdminDashboard";
import RegistrationForm from "./RegistrationForm";
import ProtectedRoute from "../routes/ProtectedRoute";

if (process.env.NODE_ENV === "development") {
  console.log("mock start");
  const { worker } = require("../mocks/browser");
  worker.start();
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        {/* <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
