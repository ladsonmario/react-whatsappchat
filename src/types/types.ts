export type ActiveChatType = {
    chatId: number;
}
export type ChatListType = {
    chatId: number,
    title: string;
    avatar: string;
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