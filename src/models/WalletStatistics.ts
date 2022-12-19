import CategoryDto from "./CategoryDto";

export interface WalletStatistics {
    expenses: number;
    incomes: number;
    expensesByCategory:object;
}