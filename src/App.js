import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Dummy Yet
const BoardPage = () => <div><h2>게시판 페이지</h2></div>;
const ChatbotPage = () => <div><h2>챗봇 페이지</h2></div>;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
    </Layout>
  );
}

export default App;