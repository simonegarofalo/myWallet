const TRANSACTIONS = [];

// Utility functions
const $ = selector => document.getElementById(selector);
const $$ = selector => document.querySelector(selector);
const $$All = selector => document.querySelectorAll(selector);


let translations = {};

// Set the current language trying to load the saved language from localStorage if saved
let currentLang = localStorage.getItem("myWalletLang") || "en";

fetch("lang.json")
  .then(res => res.json())
  .then(data => {
      translations = data;
      
      applyTranslations();
  })
  .catch(err => console.error("Error loading translations:", err));


// Translates all elements that have the data-key attribute
function applyTranslations() {
    $$All("[data-key]").forEach(el => {
        console.log($$All("[data-key]"))
        console.log(el.dataset.key)
        const key = el.dataset.key;
        const type = el.dataset.type;
        
        const typeText = type ? translateText(`forms.${type}Category`) : '';
        el.innerHTML = translateText(key).replace("{{type}}", typeText ? `<span class="${type} highlight">${typeText}</span>` : '');

      });

    showTransactions();
}


//Function that receives a key and returns the translated text in the current language
function translateText(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations[currentLang]) || key;
}


// Changes the current language
function switchLang(lang) { 
    currentLang = lang;
    localStorage.setItem("myWalletLang", currentLang);
    applyTranslations(); 
}

$("lang-en").addEventListener("click", () => switchLang("en"));
$("lang-it").addEventListener("click", () => switchLang("it"));


// Shows the "Income" form and hides the "Expense" form, or vice versa, based on button clicks
function showForm(type) {
    const incomeForm = $("income-form");
    const expensesForm = $("expenses-form");

    if (type === "income") {
        incomeForm.classList.remove("hidden");
        expensesForm.classList.add("hidden");
    } else {
        expensesForm.classList.remove("hidden");
        incomeForm.classList.add("hidden");
    }
    
}

//Hides Form if dismiss button is clicked

function hideForm() {
    
    const expensesForm = $("expenses-form");
    expensesForm.classList.add("hidden");


}

$("dismiss-expenses").addEventListener('click', ()=> hideForm());

// Attach event listeners to form toggle buttons
$("button-form-income").addEventListener('click', () => showForm("income"));

$("button-form-expenses").addEventListener('click', () => showForm("expenses"));


// Ensures that amount inputs are consistently formatted with 2 decimal places.
function formatOnBlur(input) {
    input.addEventListener("blur", () => {
        const value = parseFloat(input.value);
        if (!isNaN(value) && value > 0) {
            input.value = value.toFixed(2);
        } else {
            input.value = "";
        }
    });
}

formatOnBlur($("amount-expenses"));
formatOnBlur($("amount-income"));


// Creates and returns a <tr> element representing a single transaction
function createTransaction(m) {
    const tr = document.createElement("tr");
    tr.dataset.id = m.id;

    
    const categoryKey =
        m.type === "income"
            ? `forms.incomeCategories.${m.category}`
            : `forms.expensesCategories.${m.category}`;

    const values = [
        new Date(m.date).toLocaleDateString(currentLang),
        translateText(categoryKey),
        translateText(`forms.${m.type}Category`),
        (m.type === "expenses" ? "-" : "+") + m.amount.toFixed(2) + " €"
    ];

    values.forEach((val, i) => {
        const td = document.createElement("td");
        td.textContent = val;
        if (i >= 2) td.className = m.type === "income" ? "positive" : "negative";
        tr.appendChild(td);
    });

    const tdActions = document.createElement("td");
    const btnDelete = document.createElement("span");
    btnDelete.classList.add("action-delete");
    btnDelete.innerHTML =
        '<img src="./assets/icons/basket.png" alt="Delete" width="20" height="20">';
    btnDelete.addEventListener("click", () => deleteTransaction(m.id));
    tdActions.appendChild(btnDelete);
    tr.appendChild(tdActions);

    return tr;
}


// Initially renders all transactions when loading the page
function showTransactions() {
    const list = $$(".expenses-list");
    list.innerHTML = "";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = [
        "table.date",
        "table.category",
        "table.type",
        "table.amount",
        "table.actions"
    ];

    headers.forEach(key => {
        const th = document.createElement("th");
        th.textContent = translateText(key);
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    list.appendChild(thead);

    const tbody = document.createElement("tbody");
    list.appendChild(tbody);

    if (TRANSACTIONS.length === 0) {
        const tr = document.createElement("tr");
        tr.classList.add("no-transaction-alert");
        tr.innerHTML = `<td colspan="5">${translateText("table.noTransactions")}</td>`;
        tbody.appendChild(tr);
        return;
    }

    // Sort transactions by date (latest first)
    TRANSACTIONS.sort((a, b) => new Date(b.date) - new Date(a.date));
    TRANSACTIONS.forEach(m => tbody.appendChild(createTransaction(m)));
}



// Displays either an error alert or a confirmation dialog depending on the provided type
function showAlert(type, options = {}) {
    const formContainer = $("transactions");
    if (formContainer.querySelector(".alert-error") || formContainer.querySelector(".remove-transaction-alert")) return;

    const alert = document.createElement("div");
    alert.classList.add(type === "error" ? "alert-error" : "remove-transaction-alert");
    alert.setAttribute("role", type === "confirm" ? "alertdialog" : "alert");
    if (type === "error") {
        alert.textContent = translateText(options.textKey || "alerts.emptyFields");
        formContainer.appendChild(alert);
        setTimeout(() => alert.remove(), options.duration || 2000);
    } else if (type === "confirm") {
        alert.textContent = translateText(options.textKey || "alerts.deleteTransaction");

        const btnWrapper = document.createElement("div");
        btnWrapper.classList.add("buttons-wrapper");
        const btnConfirm = document.createElement("button");
        btnConfirm.setAttribute("aria-label", translateText("alerts.confirm"));
        
        btnConfirm.textContent = translateText("alerts.confirm");
        const btnCancel = document.createElement("button");
        btnCancel.classList.add("secondary-button");
        btnCancel.setAttribute("aria-label", translateText("alerts.cancel"));
        btnCancel.textContent = translateText("alerts.cancel");

        btnWrapper.appendChild(btnConfirm);
        btnWrapper.appendChild(btnCancel);
        alert.appendChild(btnWrapper);
        formContainer.appendChild(alert);

        btnConfirm.addEventListener("click", () => {
            if (options.onConfirm) options.onConfirm();
            alert.remove();
        });

        btnCancel.addEventListener("click", () => alert.remove());
    }
}


// Calculates and updates total income, total expenses, and balance
function updateTotals() {
    let totalIncome = 0;
    let totalExpenses = 0;

    TRANSACTIONS.forEach(m => m.type === "income" ? totalIncome += m.amount : totalExpenses += m.amount);

    $$(".total-income").textContent = "+ " + totalIncome.toFixed(2) + " €";
    $$(".total-expenses").textContent = "- " + totalExpenses.toFixed(2) + " €";
    $$(".total-balance").textContent = (totalIncome - totalExpenses).toFixed(2) + " €";
}


// Generates a unique ID for each transaction using the modern crypto.randomUUID() method if available
function generateId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function')
        return crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}


// Adds a new transaction, updates totals, and appends only the new row to the table for better performance
function addTransaction(type) {
    const transactionID = generateId();
    const amountEl = $(`amount-${type}`);
    const categoryEl = $(`category-${type}`);
    const dateEl = $(`date-${type}`);

    const amountValue = parseFloat(amountEl.value);
    const categoryValue = categoryEl.value;
    const dateValue = dateEl.value;

    if (isNaN(amountValue) || amountValue <= 0 || !categoryValue || !dateValue) {
        showAlert("error");
        return;
    }

    const newTransaction = {
        id: generateId(),
        type: type,
        amount: amountValue,
        category: categoryValue,
        date: dateValue
    };

    TRANSACTIONS.push(newTransaction);
    saveTransactions();
    updateTotals();
    showTransactions();

    amountEl.value = "";
    categoryEl.value = "";
    dateEl.value = "";
}

$("add-expenses").addEventListener("click", () => addTransaction("expenses"));
$("add-income").addEventListener("click", () => addTransaction("income"));


// Shows a confirmation dialog and removes a transaction if confirmed
function deleteTransaction(id) {
    showAlert("confirm", {
        textKey: "alerts.deleteTransaction",
        onConfirm: () => {
            const index = TRANSACTIONS.findIndex(m => m.id === id);
            if (index !== -1) {
                TRANSACTIONS.splice(index, 1);
                saveTransactions();
                updateTotals();
                showTransactions();
            }
        }
    });
}


// Saves the current state of the TRANSACTIONS array into localStorage
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(TRANSACTIONS));
}


// Loads transactions from localStorage, updates the in-memory list, and updates the UI
function loadTransactions() {
    const dati = JSON.parse(localStorage.getItem("transactions")) || [];
    TRANSACTIONS.length = 0;
    TRANSACTIONS.push(...dati);
    showTransactions();
    updateTotals();
}

loadTransactions();


// Toggles visibility of the transaction list and rotates the arrow icon accordingly
const showRecent = $("show-transactions");
const list = $$(".expenses-list");
const icon = $("icon-toggle");

showRecent.addEventListener('click', () => {
    list.classList.toggle("hidden");
    icon.style.transform = list.classList.contains("hidden") ? "rotate(0deg)" : "rotate(180deg)";
});
