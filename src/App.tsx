import { useState, useEffect } from 'react';
import { ChatListItem } from './components/ChatListItem';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

function App() {
    const [chatList, setChatList] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

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
                       <ChatListItem /> 
                    ))}
                </div>
            </div>
            <div className="content--area">
                ...
            </div>
        </div>
    );
}

export default App;