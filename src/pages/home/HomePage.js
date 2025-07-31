import { useNavigate } from 'react-router-dom';
import ActionCard from '../../components/cards/ActionCard';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">커뮤니티에 오신 것을 환영합니다</h1>
                <p className="mt-4 text-lg text-gray-600">아래에서 원하시는 서비스를 선택하여 시작하세요.</p>
            </div>
            
            <div className="flex justify-center flex-wrap gap-8">
                <ActionCard 
                    title="게시판"
                    text="자유롭게 글을 작성하고 다른 사람들과 의견을 나눠보세요."
                    buttonText="게시판으로 이동 →"
                    onButtonClick={() => navigate('/boards')}
                    buttonVariant="primary"
                />

                <ActionCard
                    title="AI 챗봇"
                    text="최신 AI 챗봇과 함께 궁금한 점에 대해 대화해보세요."
                    buttonText="챗봇으로 이동 →"
                    onButtonClick={() => navigate('/chatbot')}
                    buttonVariant="success"
                />
            </div>
        </div>
    );
}

export default HomePage;