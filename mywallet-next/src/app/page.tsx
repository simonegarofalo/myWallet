import Navbar from "./components/navbar";
import BalanceSection from "./components/balanceSection/balanceSection";

export default function Home() {
  const total = 1200;
  const income = 2000;
  const expenses = 800;
  return (
    <>
    <Navbar />
    <main>
      <BalanceSection total={total} income={income} expenses={expenses}  />
    </main>
    </>
  );
}
