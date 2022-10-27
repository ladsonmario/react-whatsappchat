import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './firebaseConfig';
import * as T from '../types/types';

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
    }
}