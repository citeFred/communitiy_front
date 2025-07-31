import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/features/auth';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await signup(formData);

            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            navigate('/login');
            
        } catch (err) {
            const errorMessage = err.response?.data || '알 수 없는 오류가 발생했습니다.';
            setMessage(`회원가입 실패: ${errorMessage}`);
            setIsError(true);
            console.error('Signup failed:', err);
        }
    };

    return (
        <main className="container" style={{ maxWidth: '400px' }}>
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">회원가입</h1>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label className="form-label">아이디:</label>
                            <input type="text" name="username" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">비밀번호:</label>
                            <input type="password" name="password" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">닉네임:</label>
                            <input type="text" name="nickname" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">이메일:</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100">회원가입</button>
                    </form>
                    {message && (
                        <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default SignupPage;