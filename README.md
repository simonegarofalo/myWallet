![myWallet](./assets/myWallet.gif)

# myWallet

**Simple personal finance tracker** — a small web app built with plain HTML, CSS and JavaScript. It lets the user add income and expenses, stores them in `localStorage`, shows totals and a transaction list, and supports deleting items.

---

## Demo

This is a static web project. You can preview it locally by opening `index.html` in a browser or see it live here: [Live Demo](https://app-mywallet.netlify.app/).

---

## Features

- Add **entrata** (income) and **uscita** (expense) with: date, category and amount.
- Persists transactions in `localStorage`.
- View totals: total income, total expenses and balance.
- Sorts transactions by date (latest first).
- Delete transactions with confirmation dialog.
- Fully responsive UI for desktop and mobile.

---

## Tech stack

- HTML5
- CSS3
- JavaScript
- Browser APIs: `localStorage`, `crypto.randomUUID()`

---

## File structure

```
myWallet/
├─ index.html
├─ style.css
├─ index.js
├─ assets/
│  ├─ logo.png
│  └─ icons/
│
├─ README.md

```

---

## Data model

Each transaction (`movimento`) uses this shape:

```js
{
  id: "string",        // uuid
  tipo: "entrata" | "uscita",
  importo: Number,      // float
  categoria: "string",
  data: "YYYY-MM-DD"
}
```

All transactions are stored as an array in `localStorage` under the `MOVIMENTI` key.

---

## How it works

1. On startup `caricaMovimenti()` reads `localStorage` and populates the global `MOVIMENTI` array.
2. `mostraMovimenti()` renders the table (thead + tbody) built from `MOVIMENTI`. It sorts by date.
3. Clicking **+ Aggiungi entrata/uscita** shows the relevant form via `mostraForm()`.
4. When the user clicks **Aggiungi**, `aggiungiMovimento(tipo)` validates inputs, creates an entry with `crypto.randomUUID()`, pushes it to `MOVIMENTI`, calls `salvaMovimenti()` (writes `localStorage`), updates totals and appends only the new row to the table for performance.
5. Deletion uses `eliminaMovimento(id)`, which asks for confirmation and removes the entry from `MOVIMENTI`, updates storage and totals and removes the corresponding `<tr>`.

---

## Usage

- Click **+ Aggiungi entrata** or **+ Aggiungi uscita** to open a form.
- Fill date, select category, type amount.
- Click **Aggiungi** to store the transaction.
- Open **Mostra tutte le transazioni** to toggle the transactions table.
- Click the trash icon to delete a transaction (a confirmation dialog appears).

---

## Future improvements

- Refactor the project using a front-end framework (maybe Astro or React) for better scalability.
- Integrate a backend with Node.js, Express and MySQL.

---

Developed by <a href="https://github.com/simonegarofalo">simonegarofalo</a>

Feel free to fork, use, or contribute to the project.
