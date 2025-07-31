import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/features/auth';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login(username, password);
            
            localStorage.setItem('accessToken', response.data.accessToken);
            alert('로그인 성공!');
            
            navigate('/');
            window.location.reload();

        } catch (err) {
            setError('아이디 또는 비밀번호를 확인해주세요.');
            console.error('Login failed:', err);
        }
    };

    return (
        <main className="flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-center mb-6">로그인</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label 
                            htmlFor="login-username" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            아이디:
                        </label>
                        <input
                            type="text"
                            id="login-username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label 
                            htmlFor="login-password" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            비밀번호:
                        </label>
                        <input
                            type="password"
                            id="login-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                    >
                        로그인
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-4 rounded-md text-center bg-red-100 text-red-700" role="alert">
                        {error}
                    </div>
                )}
            </div>
        </main>
    );
}

export default LoginPage;