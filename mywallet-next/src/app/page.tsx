import Navbar from "./components/navbar/navbar";
import BalanceSection from "./components/balanceSection/balanceSection";
import TransactionFormsHandler from "./components/transactions/transactionFormHandler";
import TransactionsList from "./components/transactions/transactionsList";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <BalanceSection />
        <TransactionFormsHandler />
        <TransactionsList />
      </main>
    </>
  );
}
