import { useEffect, useState } from 'react';
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
    const [activeChat, setActiveChat] = useState<T.ChatListType>();
    const [user, setUser] = useState<T.UserType>();
    const [newChat, setNewChat] = useState<boolean>(false);
    const [mobile, setMobile] = useState<boolean>(false);

    useEffect(() => {
        if(user) {
            return useAPI.onChatList(user.id, setChatList);                        
        }
    }, [user]);

    const handleChatItemClick = (index: number) => {        
        setActiveChat(chatList[index]);
        setMobile(true);
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
            <NewChat show={newChat} setShow={setNewChat} user={user} chatList={chatList} startChat={setActiveChat} mobile={setMobile} />
            <div className={`side--bar ${mobile? 'top' : ''}`}>                
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
            <div className={`content--area ${mobile? 'bottom' : ''}`}>
                {activeChat?.chatId !== undefined &&
                    <ChatWindow user={user} data={activeChat} mobile={setMobile} onchat={mobile} />
                } 
                {activeChat?.chatId === undefined &&
                    <ChatIntro />               
                }                
            </div>
        </div>
    );
}

export default App;