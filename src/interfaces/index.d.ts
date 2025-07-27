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
// export interface Transaction {
//     id: number;
//     name: string;
//     type: TransactionType; // Asumiendo que '0', '1', '2' son posibles valores
//     amount: string; // Es string en el JSON, no number
//     description?: string | null;
//     date: string;
//     createdAt: string; // Si viene como ISO string
//     updatedAt: string;
//     accountName: string;
//     accountCurrency: string;
//     categoryName: string;
//     categoryColor: string;
//     categoryType: '0' | '1' | '2'; // Según su sistema de categorías
//   }

export interface Transaction {
    id: number;
    type: TransactionType; // '1' for income, '2' for expense
    amount: number; 
    description?: string | null;
    date: string;
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
}


// interface de categoria
export interface Category {
    id: number,
    name: string,
    color: string,
    type: TransactionType,
}

export type TransactionType = '0' | '1';// '1' for income, '0' for expense




