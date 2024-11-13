import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
    month: string;
    balance: number;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;
    userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
    balance,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    userCanAddTransaction,
}: SummaryCards) => {
    return (
        <div className="space-y-6">
            {/* PRIMEIRO CARD */}

            <SummaryCard
                icon={<WalletIcon
                    size={16} />}
                title="Saldo"
                amount={balance}
                size="large"
                userCanAddTransaction={JSON.parse(JSON.stringify(userCanAddTransaction))}
            />

            {/* OUTROS CARDS */}

            <div className="grid grid-cols-3 gap-6">
                <SummaryCard icon={<PiggyBankIcon size={18} />} title="Investido" amount={JSON.parse(JSON.stringify(investmentsTotal))} />
                <SummaryCard icon={<TrendingUpIcon size={18} className="text-primary" />} title="Receitas" amount={JSON.parse(JSON.stringify(depositsTotal))} />
                <SummaryCard icon={<TrendingDownIcon size={18} className="text-red-500" />} title="Despesas" amount={JSON.parse(JSON.stringify(expensesTotal))} />
            </div>
        </div>
    );
}

export default SummaryCards;