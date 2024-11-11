import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
    month: string;
}

const SummaryCards = async ({ month }: SummaryCards) => {
    const where = {
        date: {
            gte: new Date(`2024-${month}-01`),
            lt: new Date(`2024-${month}-31`),
        }
    }
    const depositsTotal = Number((await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
    }))?._sum?.amount);
    const investmentisTotal = Number((await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
    }))?._sum?.amount);
    const expensesTotal = Number((await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
    }))?._sum?.amount);
    const balance = depositsTotal - investmentisTotal - expensesTotal;
    return (
        <div className="space-y-6">
            {/* PRIMEIRO CARD */}

            <SummaryCard icon={<WalletIcon size={16} />} title="Saldo" amount={balance} size="large" />

            {/* OUTROS CARDS */}

            <div className="grid grid-cols-3 gap-6">
                <SummaryCard icon={<PiggyBankIcon size={18} />} title="Investido" amount={investmentisTotal} />
                <SummaryCard icon={<TrendingUpIcon size={18} className="text-primary" />} title="Receitas" amount={depositsTotal} />
                <SummaryCard icon={<TrendingDownIcon size={18} className="text-red-500" />} title="Despesas" amount={expensesTotal} />

            </div>
        </div>
    );
}

export default SummaryCards;