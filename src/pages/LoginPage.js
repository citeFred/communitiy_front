import { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error('로그인 실패');
            }

            localStorage.setItem('accessToken', result.accessToken);
            alert('로그인 성공!');
            window.location.href = '/board';
        } catch (err) {
            setError('아이디 또는 비밀번호를 확인해주세요.');
        }
    };

    return (
        <main className="container" style={{ maxWidth: '400px' }}>
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">로그인</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="login-username" className="form-label">아이디:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="login-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="login-password" className="form-label">비밀번호:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">로그인</button>
                    </form>
                    {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                </div>
            </div>
        </main>
    );
}

export default LoginPage;