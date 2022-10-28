export type ChatListType = {
    chatId: string,
    title: string;
    image: string;
    with: string;
    lastMessage?: string;
    lastMessageDate?: {
        seconds: number;
        nanoseconds: number;
    }
}

export type ChatMessageType = {
    author: string;
    body: string;
    type: 'text';
    date?: {
        seconds: number;
        nanoseconds: number;
    }
}

export type UserType = {
    id: string;
    name: string;
    avatar: string;
}

export type UserLoginType = {
    uid: string;
    displayName: string;
    photoURL: string;
}

export type ResultLoginType = {
    user: UserLoginType;
}