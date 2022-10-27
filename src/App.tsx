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
import { Login } from './components/Login';
import { useAPI } from './firebase/api';

function App() {
    const [chatList, setChatList] = useState<T.ChatListType[]>([]);
    const [activeChat, setActiveChat] = useState<T.ActiveChatType>();
    const [user, setUser] = useState<T.UserType>({
        id: 'kOuoOwkhuTYqjGqY2ZcMhZGK5p63',
        name: 'Ladson Mario',
        avatar: 'https://graph.facebook.com/5584417671645003/picture'
    });
    const [newChat, setNewChat] = useState<boolean>(false);

    const handleChatItemClick = (index: number) => {
        setActiveChat(chatList[index]);
    }

    const handleNewChat = () => {
        setNewChat(true);
    }

    const handleLoginData = async (user: T.UserLoginType) => {
        const newUser: T.UserType = {
            id: user.uid,
            name: user.displayName,
            avatar: user.photoURL
        }

        await useAPI.addUser(newUser);
        setUser(newUser);
    }

    if(!user) {
        return ( <Login onReceive={handleLoginData} /> );
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