"use client"

import { Button } from "@/app/_components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from 'react-markdown';

interface AiReportButtonProps {
    month: string;
}

const AiReportButton = ({ month }: AiReportButtonProps) => {
    const [report, setReport] = useState<string | null>(null);
    const [reportIsloading, setReportIsLoading] = useState(false);
    const handleGenerateReportClick = async () => {
        try {
            setReportIsLoading(true);
            const aiRegport = await generateAiReport({ month });
            setReport(aiRegport);
        } catch (error) {
            console.error(error);
        } finally {
            setReportIsLoading(false);
        }
    }
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="ghost" >
                    Relatório IA
                    <BotIcon size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Relatório IA</DialogTitle>
                    <DialogDescription>
                        Use inteligência artificial para gerar um relatório com insights
                        sobre suas finanças.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="prose prose-h3:text-white max-h-[450px] text-white prose-h4:text-white prose-strong:text-white">
                    <Markdown>
                        {report}
                    </Markdown>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleGenerateReportClick} disabled={reportIsloading}>
                        {reportIsloading && <Loader2Icon className="animate-spin" />}
                        Gerar Relatório
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AiReportButton;