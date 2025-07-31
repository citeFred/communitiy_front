/**
 * 재사용 가능한 액션 카드 컴포넌트
 * @param {string} title - 카드 제목
 * @param {string} text - 카드 내용
 * @param {string} buttonText - 버튼에 표시될 텍스트
 * @param {function} onButtonClick - 버튼 클릭 시 실행될 함수
 * @param {string} buttonVariant - 버튼 색상 (Bootstrap variant: primary, success 등)
 */
function ActionCard({ title, text, buttonText, onButtonClick, buttonVariant = 'primary' }) {
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title mb-3">{title}</h5>
                    <p className="card-text flex-grow-1">{text}</p>
                    <button onClick={onButtonClick} className={`btn btn-${buttonVariant} mt-auto`}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ActionCard;