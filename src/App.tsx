import { useState } from 'react';
import { ChatListItem } from './components/ChatListItem';
import { ChatIntro } from './components/ChatIntro';
import { ChatWindow } from './components/ChatWindow';
import { NewChat } from './components/NewChat';
import * as T from './types/types';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

function App() {
    const [chatList, setChatList] = useState<T.ChatListType[]>([
        { chatId: 1, title: 'Meu dengo', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png' },
        { chatId: 2, title: 'Lad', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png' },
        { chatId: 3, title: 'Naruto', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png' },
        { chatId: 4, title: 'Hinata', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png' }        
    ]);
    const [activeChat, setActiveChat] = useState<T.ActiveChatType>();
    const [user, setUser] = useState<any>({
        id: 1997,
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
        name: 'Ladson'
    });
    const [newChat, setNewChat] = useState<boolean>(false);

    const handleChatItemClick = (index: number) => {
        setActiveChat(chatList[index]);
    }

    const handleNewChat = () => {
        setNewChat(true);
    }

    return (
        <div className="window--app">
            <NewChat show={newChat} setShow={setNewChat} user={user} chatList={chatList} />
            <div className="side--bar">                
                <header>
                    <img src={user.avatar} alt="" />
                    <div className="header--buttons">                        
                        <div className="icon--container">
                            <DonutLargeIcon />
                        </div>   
                        <div className="icon--container" onClick={handleNewChat}>
                            <ChatIcon />
                        </div> 
                        <div className="icon--container">
                            <MoreVertIcon />
                        </div>                                                  
                    </div>
                </header>
                <div className="search--area">
                    <div className="search--input">
                        <div className="icon--container">
                            <SearchIcon />                            
                        </div>
                        <input type="search" placeholder="Procurar ou começar uma nova conversa" />
                    </div>
                </div>
                <div className="chat--list">
                    {chatList.map((item, index) => (
                       <ChatListItem key={index} data={item} onClick={() => handleChatItemClick(index)} active={activeChat?.chatId === chatList[index].chatId} /> 
                    ))}
                </div>
            </div>
            <div className="content--area">
                {activeChat?.chatId !== undefined &&
                    <ChatWindow user={user} />
                } 
                {activeChat?.chatId === undefined &&
                    <ChatIntro />               
                }                
            </div>
        </div>
    );
}

export default App;