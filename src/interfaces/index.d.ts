export interface Account {
    id: number;
    name: string;
    currency: string;
    initialBalance: string; // decimal as string
    totalBalance: string;   // decimal as string
    description?: string | null;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: number;
    name: string;
    color: string; // hex color, e.g. "#FFFFFF"
    type: string;  // '1' for income, '2' for expense
}

export interface Transaction {
    id: number;
    name: string;
    type: string; // '1' for income, '2' for expense
    amount: string; // decimal as string
    description?: string | null;
    date: Date;
    userId: number;
    accountId: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}