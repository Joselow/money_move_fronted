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
    type: TransactionType; // '1' for income, '2' for expense
    amount: number; 
    description?: string | null;
    date?: string | null;
    userId: number;
    accountId: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}    

// interfaces para la configuracion del usuario
export interface UserConfig {
    account: Account | null,
    hasMultipleAccounts: boolean,
    targetDate: string | null,
}


// interface de categoria
export interface Category {
    id: number,
    name: string,
    color: string,
    type: TransactionType,
}

export type TransactionType = '0' | '1';// '1' for income, '0' for expense




