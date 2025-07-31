import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatRooms, createChatRoom } from '../../api/features/chatbot';

function ChatRoomListPage() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getChatRooms();
                setRooms(response.data);
            } catch (error) {
                console.error("채팅방 목록 로딩 실패:", error);
            }
        };
        fetchRooms();
    }, []);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        const title = e.target.roomTitle.value;
        if (!title) return;
        try {
            const response = await createChatRoom(title);
            const newRoom = response.data;
            navigate(`/chatbot/${newRoom.id}`, { state: { title: newRoom.title } });
        } catch (error) {
            console.error("채팅방 생성 실패:", error);
            alert("채팅방 생성에 실패했습니다.");
        }
    };
    
    return (
        <div>
            <div className="text-center pb-2 border-b">
                <h2 className="text-3xl font-bold">AI 챗봇</h2>
                <p className="mt-2 text-gray-500">새로운 대화를 시작하거나 이전 대화를 선택하세요.</p>
            </div>
            
            <div className="my-6 p-6 bg-white rounded-lg shadow-md">
                <h5 className="text-xl font-bold mb-4">새 대화 시작</h5>
                <form onSubmit={handleCreateRoom} className="flex gap-2">
                    <input 
                        type="text" 
                        name="roomTitle" 
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="새 대화방 제목" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 whitespace-nowrap"
                    >
                        생성 및 입장
                    </button>
                </form>
            </div>

            <hr />

            <h4 className="text-2xl font-bold mt-6">이전 대화 목록</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {rooms.map(room => (
                    <button 
                        key={room.id} 
                        onClick={() => navigate(`/chatbot/${room.id}`, { state: { title: room.title } })} 
                        className="p-6 bg-white rounded-lg shadow-md text-left hover:shadow-lg transition-shadow"
                    >
                        <h5 className="text-lg font-bold">{room.title}</h5>
                        <p className="text-sm text-gray-500 mt-2">이전 대화를 계속합니다.</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChatRoomListPage;