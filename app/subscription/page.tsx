import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiunPlan = user.publicMetadata.subscriptionPlan = 'premium';
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">

              <h2 className="text-center text-2xl font-semibold">Plano Básico</h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">0</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações por mês (7/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios ilimitados de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              {hasPremiunPlan && (
                <Badge className="absolute top-12 left-4 bg-primary/10 text-primary">Ativo</Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">Plano Premium</h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">19</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios ilimitados de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
