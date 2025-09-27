import Navbar from "./components/navbar";
import BalanceSection from "./components/balanceSection/balanceSection";
import TransactionButtons from "./components/transactions/transactionButtons";
import TransactionFormsHandler from "./components/transactions/transactionFormHandler";

export default function Home() {
  return (
    <>
    <Navbar />
    <main>
    <BalanceSection/>
    <TransactionFormsHandler />
    </main>
    </>
  );
}
