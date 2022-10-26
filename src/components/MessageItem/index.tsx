import './styles.css';

type Props = {
    data: any;
    user: any;
}
export const MessageItem = ({ data, user }: Props) => {
    return (
        <div className={`message--line ${user.id === data.author ? 'message--end' : 'message--start'}`}>
            <div className={`message--item ${user.id === data.author ? 'message--user': ''}`}>
                <div className="message--text">{data.body}</div>
                <div className="message--date">00:01</div>
            </div>
        </div>
    );
}