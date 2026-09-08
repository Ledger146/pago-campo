import { useMemo, useState } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowUpRight, CheckCircle2, CircleDollarSign, Clock3, History, Radio, RefreshCw, RotateCcw, Send, Signal, Wallet, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

 type TxType = "Envío" | "Recepción" | "Retiro";
 type TxStatus = "Completada" | "Pendiente" | "Rechazada";

 interface Transaction {
  id: string;
  type: TxType;
  description: string;
  amount: number;
  fee: number;
  status: TxStatus;
  createdAt: string;
 }

const INITIAL_BALANCE = 2850;
const STORAGE_KEY = "pagocampo-mvp-v1";

const seedTransactions: Transaction[] = [
  { id: "PC-260907-A81F", type: "Recepción", description: "Pago recibido de Cooperativa", amount: 1250, fee: 0, status: "Completada", createdAt: "Hoy, 08:12" },
  { id: "PC-260906-C42B", type: "Envío", description: "Pago a proveedor", amount: -320, fee: 0, status: "Completada", createdAt: "Ayer, 17:40" },
  { id: "PC-260905-D17E", type: "Retiro", description: "Retiro de efectivo", amount: -500, fee: 5, status: "Completada", createdAt: "05 sep, 11:20" },
];

const makeId = () => `PC-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
const money = (value: number) => `S/ ${Math.abs(value).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const readSaved = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const Mvp = () => {
  const saved = readSaved();
  const [balance, setBalance] = useState<number>(saved?.balance ?? INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>(saved?.transactions ?? seedTransactions);
  const [signalOn, setSignalOn] = useState<boolean>(saved?.signalOn ?? true);
  const [tab, setTab] = useState<"send" | "receive" | "cashout">("send");
  const [amount, setAmount] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [message, setMessage] = useState("");

  const persist = (nextBalance: number, nextTransactions: Transaction[], nextSignal = signalOn) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ balance: nextBalance, transactions: nextTransactions, signalOn: nextSignal }));
  };

  const pending = transactions.filter((tx) => tx.status === "Pendiente");
  const metrics = useMemo(() => ({
    processed: transactions.filter((tx) => tx.status === "Completada").reduce((sum, tx) => sum + Math.max(tx.amount, 0), 0),
    payments: transactions.filter((tx) => tx.type === "Envío" && tx.status === "Completada").length,
    withdrawals: transactions.filter((tx) => tx.type === "Retiro" && tx.status === "Completada").length,
    pending: pending.length,
  }), [transactions, pending.length]);

  const addTransaction = (tx: Transaction) => {
    const next = [tx, ...transactions];
    setTransactions(next);
    persist(balance, next);
  };

  const submit = () => {
    const value = Number(amount);
    if (!value || value <= 0) {
      setMessage("Ingresa un monto válido.");
      return;
    }

    const fee = tab === "cashout" ? 5 : 0;
    if (tab !== "receive" && value + fee > balance) {
      setMessage("Saldo insuficiente para esta operación.");
      return;
    }

    const id = makeId();
    const tx: Transaction = {
      id,
      type: tab === "send" ? "Envío" : tab === "receive" ? "Recepción" : "Retiro",
      description: tab === "send" ? `Pago a ${beneficiary || "beneficiario"}` : tab === "receive" ? "Dinero recibido" : "Retiro de efectivo",
      amount: tab === "receive" ? value : -(value + fee),
      fee,
      status: signalOn ? "Completada" : "Pendiente",
      createdAt: "Ahora",
    };

    if (signalOn) {
      const nextBalance = balance + tx.amount;
      setBalance(nextBalance);
      const next = [tx, ...transactions];
      setTransactions(next);
      persist(nextBalance, next);
      setMessage(`Operación ${id} procesada correctamente.`);
    } else {
      addTransaction(tx);
      setMessage(`Sin señal: ${id} quedó pendiente. No se movió el saldo.`);
    }

    setAmount("");
    setBeneficiary("");
  };

  const restoreSignal = () => {
    const next = [...transactions];
    let nextBalance = balance;
    let changed = false;

    next.forEach((tx, index) => {
      if (tx.status !== "Pendiente") return;
      const isDebit = tx.amount < 0;
      if (isDebit && Math.abs(tx.amount) > nextBalance) {
        next[index] = { ...tx, status: "Rechazada" };
      } else {
        nextBalance += tx.amount;
        next[index] = { ...tx, status: "Completada" };
      }
      changed = true;
    });

    setSignalOn(true);
    setBalance(nextBalance);
    setTransactions(next);
    persist(nextBalance, next, true);
    setMessage(changed ? "Señal restaurada: las operaciones pendientes fueron procesadas una sola vez." : "Señal restaurada. No había operaciones pendientes.");
  };

  const retry = (tx: Transaction) => {
    if (tx.status !== "Pendiente") {
      setMessage(`Idempotencia: ${tx.id} ya fue procesada como ${tx.status.toLowerCase()}. No se genera un segundo movimiento.`);
      return;
    }
    if (!signalOn) {
      setMessage(`Reintento registrado para ${tx.id}. Sigue pendiente porque no hay señal.`);
      return;
    }
    restoreSignal();
  };

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setBalance(INITIAL_BALANCE);
    setTransactions(seedTransactions);
    setSignalOn(true);
    setAmount("");
    setBeneficiary("");
    setMessage("Demo reiniciada.");
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container-max py-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3"><ArrowLeft className="h-4 w-4" /> Volver a PagoCampo</a>
            <h1 className="text-3xl md:text-4xl font-bold">MVP PagoCampo</h1>
            <p className="text-muted-foreground mt-1">Simulación de pagos rurales sin internet.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetDemo}><RotateCcw className="h-4 w-4 mr-2" /> Reiniciar demo</Button>
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${signalOn ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
              <Signal className="h-4 w-4" /> {signalOn ? "Señal disponible" : "Sin señal"}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Saldo disponible (simulado)</span><Wallet className="h-5 w-5 text-muted-foreground" /></div>
            <div className="text-3xl font-bold mt-2">{money(balance)}</div>
            <div className="text-xs text-muted-foreground mt-2">Cuenta demostrativa · sin dinero real</div>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-sm"><span className="text-sm text-muted-foreground">Procesado</span><div className="text-2xl font-bold mt-2">{money(metrics.processed)}</div></div>
          <div className="rounded-xl border bg-card p-5 shadow-sm"><span className="text-sm text-muted-foreground">Pendientes</span><div className="text-2xl font-bold mt-2">{metrics.pending}</div></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5"><CircleDollarSign className="h-5 w-5" /><h2 className="text-xl font-semibold">Operar</h2></div>
            <div className="grid grid-cols-3 gap-2 mb-5">
              <Button variant={tab === "send" ? "default" : "outline"} onClick={() => setTab("send")}><Send className="h-4 w-4 mr-2" />Enviar</Button>
              <Button variant={tab === "receive" ? "default" : "outline"} onClick={() => setTab("receive")}><ArrowDownToLine className="h-4 w-4 mr-2" />Recibir</Button>
              <Button variant={tab === "cashout" ? "default" : "outline"} onClick={() => setTab("cashout")}><ArrowUpRight className="h-4 w-4 mr-2" />Retirar</Button>
            </div>
            {tab === "send" && <div className="mb-4"><label className="text-sm font-medium">Beneficiario</label><Input value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} placeholder="Ej. Juan / 987654321" className="mt-1" /></div>}
            <div className="mb-4"><label className="text-sm font-medium">Monto</label><Input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" placeholder="0.00" className="mt-1 text-lg" /></div>
            {tab === "cashout" && <p className="text-sm text-muted-foreground mb-4">Comisión demostrativa de retiro: S/ 5.00.</p>}
            <Button onClick={submit} className="w-full" size="lg">{signalOn ? "Procesar operación" : "Registrar operación pendiente"}</Button>
            {!signalOn && <Button onClick={restoreSignal} variant="outline" className="w-full mt-2"><RefreshCw className="h-4 w-4 mr-2" />Restaurar señal y procesar pendientes</Button>}
            {message && <div className="mt-4 rounded-lg bg-muted p-3 text-sm">{message}</div>}

            <div className="mt-6 rounded-lg border p-4">
              <div className="flex items-center justify-between gap-3">
                <div><div className="font-medium flex items-center gap-2"><Radio className="h-4 w-4" />Simulador de señal rural</div><p className="text-xs text-muted-foreground mt-1">Prueba qué ocurre si la antena pierde conexión durante una operación.</p></div>
                <Button size="sm" variant={signalOn ? "outline" : "default"} onClick={() => { const next = !signalOn; setSignalOn(next); persist(balance, transactions, next); setMessage(next ? "Señal activada." : "Señal desactivada. Las nuevas operaciones quedarán pendientes."); }}>{signalOn ? "Desactivar" : "Activar"}</Button>
              </div>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5"><div className="flex items-center gap-2"><History className="h-5 w-5" /><h2 className="text-xl font-semibold">Historial</h2></div><span className="text-xs text-muted-foreground">TX-ID único</span></div>
            <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
              {transactions.map((tx) => (
                <div key={tx.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div><div className="font-medium">{tx.description}</div><div className="text-xs text-muted-foreground mt-1">{tx.type} · {tx.createdAt}</div></div>
                    <div className={`font-semibold whitespace-nowrap ${tx.amount >= 0 ? "text-emerald-700" : ""}`}>{tx.amount >= 0 ? "+" : "-"}{money(tx.amount)}</div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs">
                    <span className="font-mono text-muted-foreground">{tx.id}</span>
                    <span className="inline-flex items-center gap-1">{tx.status === "Completada" ? <CheckCircle2 className="h-3.5 w-3.5" /> : tx.status === "Pendiente" ? <Clock3 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{tx.status}</span>
                  </div>
                  {tx.status === "Pendiente" && <Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => retry(tx)}><RefreshCw className="h-3.5 w-3.5 mr-2" />Reintentar TX-ID (prueba de idempotencia)</Button>}
                  {tx.fee > 0 && <div className="text-xs text-muted-foreground mt-2">Comisión: {money(tx.fee)}</div>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><Radio className="h-5 w-5" /><h2 className="text-lg font-semibold">Panel operativo</h2></div>
          <div className="grid gap-3 sm:grid-cols-4 text-sm">
            <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground">Pagos completados</div><div className="font-semibold text-lg">{metrics.payments}</div></div>
            <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground">Retiros completados</div><div className="font-semibold text-lg">{metrics.withdrawals}</div></div>
            <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground">Operaciones pendientes</div><div className="font-semibold text-lg">{metrics.pending}</div></div>
            <div className="rounded-lg bg-muted p-3"><div className="text-muted-foreground">Estado del sistema</div><div className="font-semibold text-lg">{signalOn ? "Operativo" : "Sin señal"}</div></div>
          </div>
        </section>

        <div className="mt-6 rounded-lg border border-dashed p-4 text-sm text-muted-foreground"><strong>Nota:</strong> este es un MVP demostrativo para portafolio. Los saldos, pagos y retiros son simulados; no se mueve dinero real ni se conecta a bancos.</div>
      </div>
    </main>
  );
};

export default Mvp;
