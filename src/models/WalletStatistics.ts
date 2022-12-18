import CategoryDto from "./CategoryDto";

export interface WalletStatistics {
    expenses: number;
    incomes: number;
    expensesByCategory:Map<CategoryDto,number>;
}