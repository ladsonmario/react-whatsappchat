import { useState, useEffect } from 'react';
import './styles.css';
import { ChatListType } from '../../types/types';

type Props = {
    onClick: () => void;
    active: boolean;
    data: ChatListType;
}

export const ChatListItem = ({ onClick, active, data }: Props) => {
    const [time, setTime] = useState<string>('');
    
    useEffect(() => {
        if(data.lastMessageDate.seconds) {
            const d: Date = new Date(data.lastMessageDate.seconds * 1000);
            const h: number | string = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            const m: number | string = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            setTime(`${h}:${m}`);
        }
    }, [data]);

    return (
        <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
            <img className="chatListItem--avatar" src={data.image} alt="" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{data.title}</div>
                    <div className="chatListItem--date">{time}</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}