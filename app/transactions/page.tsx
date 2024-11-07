import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionsPage = async () => {
    //acessar as transações do meu banco de dados
    const transactions = await db.transaction.findMany({});
    return (
        <div className="p-6 space-y-6">
            {/* TÍTULO E BOTÃO */}
            <div className="flex w-full justify-between items-center">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton />
            </div>
            <DataTable columns={transactionColumns} data={transactions} />
        </div>
    );
};

export default TransactionsPage;