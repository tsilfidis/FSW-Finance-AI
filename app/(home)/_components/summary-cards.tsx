import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
    month: string;
    balance: number;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;
}

const SummaryCards = async ({ balance, depositsTotal, expensesTotal, investmentsTotal, }: SummaryCards) => {

    return (
        <div className="space-y-6">
            {/* PRIMEIRO CARD */}

            <SummaryCard icon={<WalletIcon size={16} />} title="Saldo" amount={balance} size="large" />

            {/* OUTROS CARDS */}

            <div className="grid grid-cols-3 gap-6">
                <SummaryCard icon={<PiggyBankIcon size={18} />} title="Investido" amount={investmentsTotal} />
                <SummaryCard icon={<TrendingUpIcon size={18} className="text-primary" />} title="Receitas" amount={depositsTotal} />
                <SummaryCard icon={<TrendingDownIcon size={18} className="text-red-500" />} title="Despesas" amount={expensesTotal} />
            </div>
        </div>
    );
}

export default SummaryCards;