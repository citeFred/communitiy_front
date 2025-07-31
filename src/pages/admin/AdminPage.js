import { useNavigate } from 'react-router-dom';
import ActionCard from '../../components/cards/ActionCard';

function AdminPage() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="pb-2 border-b mb-6">
                <h2 className="text-3xl font-bold">관리자 대시보드</h2>
                <p className="mt-2 text-gray-500">여기에서 사이트의 여러 기능을 관리할 수 있습니다.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionCard
                    title="게시판 관리"
                    text="새로운 게시판을 생성하거나 기존 게시판을 관리합니다."
                    buttonText="관리하기"
                    onButtonClick={() => navigate('/admin/boards')}
                    buttonVariant="dark"
                />
                <ActionCard
                    title="사용자 관리"
                    text="사이트의 사용자를 관리합니다."
                    buttonText="준비 중"
                    onButtonClick={() => {}}
                    buttonVariant="secondary"
                /> 
               <ActionCard
                   title="서비스 설정"
                   text="웹 서비스의 전반적인 설정을 관리합니다."
                   buttonText="준비 중"
                   onButtonClick={() => {}}
                   buttonVariant="secondary"
               />
            </div>
        </div>
    );
}

export default AdminPage;