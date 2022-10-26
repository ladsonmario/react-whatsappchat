import './styles.css';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ChatWindow = () => {
    return (
        <div className="chat--window">
            <div className="chat--window--header">
                <div className="chat--window--header--info">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" alt="" />
                    <div>Lad</div>
                </div>
                <div className="chat--window--header--buttons">
                    <div className="icon--container">
                        <SearchIcon />
                    </div>
                    <div className="icon--container">
                        <AttachFileIcon />
                    </div>
                    <div className="icon--container">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="chat--window--header"></div>
            </div>
            <div className="chat--window--body"></div>
            <div className="chat--window--footer"></div>
        </div>
    );
}