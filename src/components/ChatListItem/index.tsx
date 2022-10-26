import './styles.css';
import { ChatListType } from '../../types/types';

type Props = {
    onClick: () => void;
    active: boolean;
    data: ChatListType;
}

export const ChatListItem = ({ onClick, active, data }: Props) => {
    return (
        <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
            <img className="chatListItem--avatar" src={data.avatar} alt="" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{data.title}</div>
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