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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Logo</Link>
                <div>
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/boards">게시판</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/chatbot">AI 챗봇</Link>
                        </li>

                        {/* useAuth에서 가져온 userRole로 관리자 링크를 렌더 */}
                        {isLoggedIn && userRole === 'ROLE_ADMIN' && (
                            <li className="nav-item"><Link className="nav-link" to="/admin">관리자</Link></li>
                        )}

                        {/* useAuth에서 가져온 isLoggedIn으로 메뉴를 동적으로 렌더 */}
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-outline-light ms-2">로그아웃</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">로그인</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">회원가입</Link>
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