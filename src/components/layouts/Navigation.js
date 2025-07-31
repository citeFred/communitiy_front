import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Navigation() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');
    const token = localStorage.getItem('accessToken');

    let userRole = null;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role;
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

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

                        {userRole === 'ROLE_ADMIN' && (
                            <li className="nav-item"><Link className="nav-link" to="/admin">관리자</Link></li>
                        )}

                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-outline-primary ms-2">로그아웃</button>
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