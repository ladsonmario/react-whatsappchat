import { ChangeEvent, useState, useEffect, useRef } from 'react';
import './styles.css';
import * as T from '../../types/types';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MessageItem } from '../MessageItem';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAPI } from '../../firebase/api';

type Props = {
    user: T.UserType;
    data: T.ChatListType;
    mobile: React.Dispatch<boolean>;
    onchat: boolean;
}

export const ChatWindow = ({ user, data, mobile, onchat }: Props) => {    
    const body = useRef() as React.MutableRefObject<HTMLDivElement>;
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if(!browserSupportsSpeechRecognition) {
        console.log("Browser doesn't support speech recognition");
    }

    const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [list, setList] = useState<T.ChatMessageType[]>([]);
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        setList([]);
        return useAPI.onChatContent(data.chatId, setList, setUsers);
    }, [data.chatId]);
    
    useEffect(() => {
        if(!listening) {
            SpeechRecognition.stopListening();
            resetTranscript();
            setText(transcript);            
        }
    }, [listening]);

    useEffect(() => {                
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scroll(0, body.current.scrollHeight - body.current.offsetHeight);            
        }
    }, [list, users, onchat]);

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleEmojiClick = (e: EmojiClickData) => {
        setText( text + e.emoji );
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {                        
        SpeechRecognition.startListening();           
    }

    const handleKeyEnter = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if(text !== '') {
            useAPI.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleSetMobile = () => {
        mobile(false);
    }

    return (
        <div className="chat--window">
            <div className="chat--window--header">
                <div className="chat--window--header--info">
                    <div className="icon--container back--mobile" onClick={handleSetMobile}>
                        <ArrowBackIcon />
                    </div>
                    <img src={data.image} alt="" />
                    <div>{data.title}</div>
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
            <div className="chat--window--body" ref={body}>
                {list.map((item, index) => (
                    <MessageItem key={index} data={item} user={user} />
                ))}
            </div>
            <div className={`chat--window--emoji ${emojiOpen ? 'open' : ''}`}>
               <EmojiPicker width="100%" height="100%" previewConfig={{showPreview: false}} searchDisabled skinTonesDisabled onEmojiClick={handleEmojiClick} />
            </div>
            <div className="chat--window--footer">
                <div className="chat--window--footer--pre">
                    <div className={`icon--container ${emojiOpen ? '' : 'open--icon'}`} onClick={handleCloseEmoji}>
                        <CloseIcon />
                    </div>
                    <div className={`icon--container ${emojiOpen ? 'open--active' : ''}`} onClick={handleOpenEmoji}>
                        <EmojiEmotionsIcon />
                    </div>
                </div>
                <div className="chat--window--footer--input">
                    <input type="text" placeholder="Digite uma mensagem" value={text} onChange={handleChangeText} onKeyUp={handleKeyEnter} />
                </div>
                <div className="chat--window--footer--pos">
                    {text === '' &&
                        <div className={`icon--container ${listening ? 'open--active' : '' }`} onClick={handleMicClick}>
                            <MicIcon />
                        </div>
                    }       
                    {text !== '' &&
                        <div className="icon--container" onClick={handleSendClick}>
                            <SendIcon />
                        </div>
                    }                                 
                </div>
            </div>
        </div>
    );
}