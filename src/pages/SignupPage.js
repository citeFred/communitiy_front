import { useState } from 'react';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

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
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const resultText = await response.text();
            if (!response.ok) {
                throw new Error(resultText);
            }

            setMessage('회원가입 성공! 로그인 페이지로 이동하여 로그인해주세요.');
            e.target.reset();
        } catch (err) {
            setMessage(`회원가입 실패: ${err.message}`);
            setIsError(true);
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