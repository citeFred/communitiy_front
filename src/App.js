import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout'; 
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminPage from './pages/admin/AdminPage';
import BoardListPage from './pages/boards/BoardListPage';
import ArticleListPage from './pages/boards/ArticleListPage';
import ArticleDetailPage from './pages/boards/ArticleDetailPage';
import ArticleCreatePage from './pages/boards/ArticleCreatePage';
import BoardManagementPage from './pages/admin/board-management/BoardManagementPage';
import BoardCreatePage from './pages/admin/board-management/BoardCreatePage';
import ChatbotPage from './pages/chatbot/ChatbotPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* home */}
        <Route path="/" element={<HomePage />} />
        {/* auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/boards" element={<BoardManagementPage />} />
        <Route path="/admin/boards/create" element={<BoardCreatePage />} />
        {/* chatbot */}
        <Route path="/chatbot" element={<ChatbotPage />} />
        {/* boards */}
        <Route path="/boards" element={<BoardListPage />} />
        <Route path="/boards/:boardId" element={<ArticleListPage />} />
        <Route path="/boards/:boardId/articles/create" element={<ArticleCreatePage />} />
        <Route path="/boards/:boardId/articles/:articleId" element={<ArticleDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;