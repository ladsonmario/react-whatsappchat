import { useEffect, useState } from 'react';
import './styles.css';
import * as T from '../../types/types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAPI } from '../../firebase/api';

type Props = {
    show: boolean; 
    setShow: React.Dispatch<boolean>;
    user: T.UserType; 
    chatList: T.ChatListType[];
    startChat: React.Dispatch<T.ChatListType>;
    mobile: React.Dispatch<boolean>;
}

export const NewChat = ({ show, setShow, user, chatList, startChat, mobile }: Props) => {    
    const [list, setList] = useState<T.UserType[]>([]);

    useEffect(() => {
        if(user) {
            ( async () => {
                const result: T.UserType[] = await useAPI.getContactList(user.id);
                setList(result);
            })();
        }
    }, [user]);

    const handleShow = () => {
        setShow(false);
    }

    const handleNewChat = async (user2: T.UserType) => {
        const index: number = chatList.findIndex(item => item.with === user2.id);
        
        if(index !== -1) {
            startChat(chatList[index]);  
            mobile(true);
        } else {
            await useAPI.addNewChat(user, user2);
        }        
        
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
                    <div className="new--chat--item" key={index} onClick={() => handleNewChat(item)}>
                        <img src={item.avatar} alt="" />
                        <div className="new--chat--item--name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}