import { useState, useEffect } from 'react';
import * as T from '../../types/types';
import './styles.css';

type Props = {
    data: T.ChatMessageType;
    user: T.UserType;
}
export const MessageItem = ({ data, user }: Props) => {
    const [time, setTime] = useState<string>('');
    
    useEffect(() => {
        if(data.date.seconds) {
            const d: Date = new Date(data.date.seconds * 1000);
            const h: number | string = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            const m: number | string = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            setTime(`${h}:${m}`);
        }
    }, [data]);

    return (
        <div className={`message--line ${user.id === data.author ? 'message--end' : 'message--start'}`}>
            <div className={`message--item ${user.id === data.author ? 'message--user': ''}`}>
                <div className="message--text">{data.body}</div>
                <div className="message--date">{time}</div>
            </div>
        </div>
    );
}