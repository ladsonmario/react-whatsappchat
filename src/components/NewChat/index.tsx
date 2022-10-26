import { Dispatch, useState } from 'react';
import './styles.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    show: boolean; 
    setShow: React.Dispatch<boolean>;
    user: any; 
    chatList: any;
}

export const NewChat = ({ show, setShow, user, chatList }: Props) => {    
    const [list, setList] = useState([
        {id: 123, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png', name: 'Lads' },
        {id: 13, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png', name: 'Lads' },
        {id: 12, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png', name: 'Lads' },
        {id: 23, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png', name: 'Lads' }
    ]);

    const handleShow = () => {
        setShow(false);
    }

    return (
        <div className={`new--chat ${show ? '' : 'new--chat--close'}`}>
            <div className="new--chat--header">
                    <div className="icon--container" onClick={handleShow}>
                        <ArrowBackIcon />
                    </div>
                <div className="new--chat--header--title">Nova Conversa</div>
            </div>
            <div className="new--chat--list">
                {list.map((item, index) => (
                    <div className="new--chat--item" key={index}>
                        <img src={item.avatar} alt="" />
                        <div className="new--chat--item--name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}