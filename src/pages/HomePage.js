import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4">커뮤니티 서비스에 오신 것을 환영합니다</h1>
                <p className="lead text-muted">아래에서 원하시는 서비스를 선택하여 시작하세요.</p>
            </div>
            
            <div className="row justify-content-center g-4">

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column text-center">
                            <h5 className="card-title mb-3">게시판</h5>
                            <p className="card-text flex-grow-1">
                                자유롭게 글을 작성하고 다른 사람들과 의견을 나눠보세요.
                            </p>
                            <Link to="/board" className="btn btn-primary mt-auto">게시판으로 이동 &rarr;</Link>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column text-center">
                            <h5 className="card-title mb-3">AI 챗봇</h5>
                            <p className="card-text flex-grow-1">
                                최신 AI 챗봇과 함께 궁금한 점에 대해 대화해보세요.
                            </p>
                            <Link to="/chatbot" className="btn btn-success mt-auto">챗봇으로 이동 &rarr;</Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default HomePage;