/**
 * 재사용 가능한 액션 카드 컴포넌트
 * @param {string} title - 카드 제목
 * @param {string} text - 카드 내용
 * @param {string} buttonText - 버튼에 표시될 텍스트
 * @param {function} onButtonClick - 버튼 클릭 시 실행될 함수
 * @param {string} buttonVariant - 버튼 색상 테마
 */
function ActionCard({ title, text, buttonText, onButtonClick, buttonVariant = 'primary' }) {
    const buttonStyles = {
        primary: 'bg-blue-500 hover:bg-blue-600',
        success: 'bg-green-500 hover:bg-green-600',
        dark: 'bg-gray-800 hover:bg-gray-900',
        secondary: 'bg-gray-500 hover:bg-gray-600',
    };

    const buttonClass = `w-full px-4 py-2 text-white font-bold rounded-lg transition-colors ${buttonStyles[buttonVariant] || buttonStyles.primary}`;

    return (
        <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
            <div className="p-6 flex flex-col flex-grow text-center">
                <h5 className="text-xl font-bold mb-3">{title}</h5>
                <p className="text-gray-600 flex-grow">{text}</p>
                <button onClick={onButtonClick} className={`mt-4 ${buttonClass}`}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default ActionCard;