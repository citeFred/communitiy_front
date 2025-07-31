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
import ProtectedRoute from './common/protected-route/ProtectedRoute';
import ChatPage from './pages/chatbot/ChatPage';
import ChatRoomListPage from './pages/chatbot/ChatRoomListPage';

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
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/boards" element={<ProtectedRoute><BoardManagementPage /></ProtectedRoute>} />
        <Route path="/admin/boards/create" element={<ProtectedRoute><BoardCreatePage /></ProtectedRoute>} />
        {/* chatbot */}
        <Route path="/chatbot" element={<ProtectedRoute><ChatRoomListPage /></ProtectedRoute>} />
        <Route path="/chatbot/:roomId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        {/* boards */}
        <Route path="/boards" element={<ProtectedRoute><BoardListPage /></ProtectedRoute>} />
        <Route path="/boards/:boardId" element={<ProtectedRoute><ArticleListPage /></ProtectedRoute>} />
        <Route path="/boards/:boardId/articles/create" element={<ProtectedRoute><ArticleCreatePage /></ProtectedRoute>} />
        <Route path="/boards/:boardId/articles/:articleId" element={<ProtectedRoute><ArticleDetailPage /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}

export default App;