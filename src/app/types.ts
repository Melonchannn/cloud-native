export interface User {
    _id: string;
    avatar: string;
    nickname: string;
    username: string;
}

export interface Response {
    msg: string;
    code: number;
    data: any;
    total: number;
}

export interface Comment {
    userId?: string;
    date: string;
    content: string;
    productId: string;
    username: string;
    nickname: string;
}

export interface Product {
    _id?: string;
    userId?: string;
    thumb: string;
    name: string;
    describe: string;
    price: number;
    stock: number;
}
