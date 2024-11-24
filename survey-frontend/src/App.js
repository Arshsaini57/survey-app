// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateSurvey from './components/CreateSurvey';
import EditSurvey from './components/EditSurvey';
import SurveyDetails from './components/SurveyDetails';
import SurveyAnalytics from './components/SurveyAnalytics';
import Navbar from './components/Navbar';
import SurveyResponses from './components/SurveyResponses';
import TakeSurvey from './components/TakeSurvey';

function App() {  
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-survey" element={<CreateSurvey />} />
                <Route path="/edit-survey/:id" element={<EditSurvey />} />
                <Route path="/survey/:id" element={<TakeSurvey />} />
                <Route path="/survey/:id" element={<SurveyDetails />} />
                <Route path="/survey/:id/analytics" element={<SurveyAnalytics />} />
                <Route path="/survey/:id/responses" element={<SurveyResponses />} />           
            </Routes>
        </Router>
    );
}

export default App;

  