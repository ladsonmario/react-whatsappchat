import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './firebaseConfig';
import * as T from '../types/types';
import { Dispatch } from 'react';

const firebaseApp:firebase.app.App = firebase.initializeApp(firebaseConfig);
const db:firebase.firestore.Firestore = firebase.firestore(firebaseApp);

export const useAPI = {
    fbPopup: async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        return await firebaseApp.auth().signInWithPopup(provider);
    },
    addUser: async (user: T.UserType) => {
        await db.collection('users').doc(user.id).set({
            name: user.name,
            avatar: user.avatar
        }, { merge: true });
    },
    getContactList: async (userId: string) => {
        const list: T.UserType[] = [];

        const results = await db.collection('users').get(); 
        results.forEach(item => {                 
            const data = item.data();           

            if(item.id !== userId) {
                list.push({
                    id: data.id,
                    name: data.name,
                    avatar: data.avatar
                });
            }
        });

        return list;
    },
    addNewChat: async (user: T.UserType, user2: T.UserType) => {
        const newChat = await db.collection('chats').add({
            messages: [] as string[],
            users: [user.id, user2.id]
        });

        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        });

        db.collection('users').doc(user2.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });
    },
    onChatList: (userId: string, setChatList: Dispatch<T.ChatListType[]>) => {
        return db.collection('users').doc(userId).onSnapshot((doc) => {
            if(doc.exists) {
                const data = doc.data() as firebase.firestore.DocumentData;
                if(data.chats) {
                    const chats: T.ChatListType[] = [...data.chats];

                    chats.sort((a:T.ChatListType, b:T.ChatListType) => {
                        if(!a.lastMessageDate) {
                            return -1;
                        }
                        if(!b.lastMessageDate) {
                            return -1;
                        }
                        
                        if(a.lastMessageDate < b.lastMessageDate) {
                            return 1;
                        } else {
                            return -1;
                        }                         
                    });

                    setChatList(chats);
                }
            }
        });
    },
    onChatContent: (chatId: string, setList: Dispatch<T.ChatMessageType[]>, setUsers: Dispatch<string[]>) => {        
        return db.collection('chats').doc(chatId).onSnapshot((doc) => {
            if(doc.exists) {
                const data = doc.data() as firebase.firestore.DocumentData;
                
                setList(data.messages);
                setUsers(data.users);                
            }
        });
    },
    sendMessage: async (chatData: T.ChatListType, userId: string, type: string, body: string, users: string[]) => {
        const now: Date = new Date();
        db.collection('chats').doc(chatData.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: userId,
                body,
                date: now
            })
        });

        for(let i in users) {
            let u = await db.collection('users').doc(users[i]).get();
            let uData = u.data() as firebase.firestore.DocumentData;

            if(uData.chats) {
                let chats = [...uData.chats];

                for(let e in chats) {
                    if(chats[e].chatId === chatData.chatId) {
                        chats[e].lastMessage = body;
                        chats[e].lastMessageDate = now
                    }
                }

                await db.collection('users').doc(users[i]).update({ chats });
            }            
        }
    }
}