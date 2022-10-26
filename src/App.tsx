import { useState, useEffect } from 'react';
import { ChatListItem } from './components/ChatListItem';
import { ChatIntro } from './components/ChatIntro';
import { ChatWindow } from './components/ChatWindow';
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

    const handleChatItemCLick = (index: number) => {
        setActiveChat(chatList[index]);
    }

    return (
        <div className="window--app">
            <div className="side--bar">
                <header>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" alt="" />
                    <div className="header--buttons">                        
                        <div className="icon--container">
                            <DonutLargeIcon />
                        </div>   
                        <div className="icon--container">
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
                       <ChatListItem key={index} data={item} onClick={() => handleChatItemCLick(index)} active={activeChat?.chatId === chatList[index].chatId} /> 
                    ))}
                </div>
            </div>
            <div className="content--area">
                {activeChat?.chatId !== undefined &&
                    <ChatWindow />
                } 
                {activeChat?.chatId === undefined &&
                    <ChatIntro />               
                }                
            </div>
        </div>
    );
}

export default App;