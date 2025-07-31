import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/hooks/useAuth';

function Navigation() {
    const navigate = useNavigate();
    const { isLoggedIn, userRole } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        alert('로그아웃 되었습니다.');
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <Link className="text-xl font-bold hover:text-gray-300" to="/">Logo</Link>
                    
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700" to="/boards">게시판</Link>
                        </li>
                        <li>
                            <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700" to="/chatbot">AI 챗봇</Link>
                        </li>

                        {isLoggedIn && userRole === 'ROLE_ADMIN' && (
                            <li><Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700" to="/admin">관리자</Link></li>
                        )}

                        {isLoggedIn ? (
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="px-3 py-2 border border-gray-500 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                                >
                                    로그아웃
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700" to="/login">로그인</Link>
                                </li>
                                <li>
                                    <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700" to="/signup">회원가입</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;