import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        alert('로그인이 필요합니다.');
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;