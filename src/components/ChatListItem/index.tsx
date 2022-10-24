import './styles.css';

export const ChatListItem = () => {
    return (
        <div className="chatListItem">
            <img className="chatListItem--avatar" src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" alt="" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">Lad</div>
                    <div className="chatListItem--date">00:01</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>Fala manoano Fala</p>
                    </div>
                </div>
            </div>
        </div>
    );
}