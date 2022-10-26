import { ChangeEvent, useState, useEffect } from 'react';
import './styles.css';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import SpeechRecognition, { useSpeechRecognition,SpeechRecognitionOptions } from 'react-speech-recognition';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

export const ChatWindow = () => {    
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if(!browserSupportsSpeechRecognition) {
        console.log("Browser doesn't support speech recognition");
    }

    const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>(''); 
    
    useEffect(() => {
        if(!listening) {
            resetTranscript();
            setText(transcript);
            SpeechRecognition.stopListening();
        }
    }, [listening]);

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

    const handleSendClick = () => {

    }

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
            <div className="chat--window--body">

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
                    <input type="text" placeholder="Digite uma mensagem" value={text} onChange={handleChangeText} />
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