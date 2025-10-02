![myWallet](./assets/myWallet.gif)

# myWallet

**The easiest way to track your finance**.

A small web app rebuilt with React, Next.js and Typescript. It lets the user add income and expenses, stores them in `localStorage`, shows totals and a transaction list, and supports deleting items.

---

## Demo

This is a static web project. You can preview it locally by running the Next.js app or see it live here: [Live Demo](https://app-mywallet.netlify.app/).

---

## Features

- Add **income** and **expenses** with: date, category and amount.
- Persists transactions in `localStorage`.
- View totals: total income, total expenses and balance.
- Sorts transactions by date
- Delete transactions with confirmation dialog.
- Simple client-side internationalization using **useLang** custom hook
- Fully responsive UI for desktop and mobile.

---

## Tech stack

- HTML5
- CSS3
- React + Typescript
- Next.js
- Testing: Jest + React Testing Library
- Browser APIs: `localStorage`, `crypto.randomUUID()`

---

## File structure

```
myWallet-next/
├─ public/
│  ├─ assets/
│  │  ├─ myWallet.gif
│  │  ├─ logo.svg
│  │  └─ icons/
├─ src/
│  ├─ app/
│  │  ├─ components/
│  │  │  ├─ balanceSection/
│  │  │  ├─ transactions/
│  │  │  ├─ navbar/
│  │  │  └─ alertModal.tsx
│  │  │
│  │  ├─ context/
│  │  ├─ hooks/
|  |  ├─ providers/
|  |  └─ utilities/
|  |
│  ├─ global.css
|  ├─ page.tsx
│  └─ layout.tsx
│
├─ jest.config.js
├─ package.json
└─ README.md


```

---

## Data model

Each transaction object has this shape in memory:

```js
{
  id: "string",        // uuid
  type: "income" | "expenses",
  category: "string",
  amount: "number",
  date: "string"
}
```

All transactions are stored in the React state managed by the TransactionsProvider and automatically persisted to ``localStorage` under the key "transactions".

---

## How it works

1. On initialization, the **TransactionsProvider** reads existing data from `localStorage` (if there are) and populates the transactions state.
2. Every time the `transactions` state changes, the provider synchronizes it back to ``localStorage`, ensuring persistence across sessions.
3. Adding a transaction is done through `addTransaction(transaction)`, which appends a new Transaction object to the state.
4. Removing a transaction is handled by `removeTransaction(id)`, which filters out the transaction with the matching ID.
5. Totals are calculated dynamically with React’s `useMemo`:

- **totalIncome** → sum of all transactions of type "income".
- **totalExpenses** → sum of all transactions of type "expenses".
- **totalBalance** → difference between income and expenses.

6. Any component wrapped inside the **TransactionsProvider** can access transactions, totals, and the add/remove functions via the **TransactionsContext**, without needing to pass props manually.

---

## Usage

- Click **Add income** or **Add expenses** to open a form.
- Fill date, select category, type amount.
- Click **Add new** to store the transaction.
- Open **Show recent** to toggle the transactions table.
- Click the trash icon to delete a transaction (a confirmation dialog appears).

---

## Future improvements

- Add a feature to sort transactions by date, amount, category, or type.
- ✔️ Add multi-language support (EN | IT)
- ✔️ Refactor the project using a front-end framework (maybe Astro or React) for better scalability.
- Integrate a backend API with Node.js, Express, and MySQL, including authentication and secure data storage.

---

Developed by <a href="https://github.com/simonegarofalo">simonegarofalo</a>

Feel free to fork, use, or contribute to the project.
