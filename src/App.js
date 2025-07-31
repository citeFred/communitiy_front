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

const ChatbotPage = () => <div><h2>챗봇 페이지</h2></div>;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/boards" element={<BoardListPage />} />
        <Route path="/boards/:boardId" element={<ArticleListPage />} />
        <Route path="/boards/:boardId/articles/:articleId" element={<ArticleDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;