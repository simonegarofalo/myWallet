const MOVIMENTI = [];

// Utility functions for selecting elements
const $ = selector => document.getElementById(selector);
const $$ = selector => document.querySelector(selector);

// Shows the "Income" form and hides the "Expense" form, or vice versa, based on button clicks
function mostraForm(tipo) {
    const entrataForm = $("entrata-form");
    const uscitaForm = $("uscita-form");

    if (tipo === "entrata") {
        entrataForm.classList.remove("hidden");
        uscitaForm.classList.add("hidden");
    } else {
        uscitaForm.classList.remove("hidden");
        entrataForm.classList.add("hidden");
    }
}

// Attach event listeners to form toggle buttons
$("button-form-entrata").addEventListener('click', () => mostraForm("entrata"));
$("button-form-uscita").addEventListener('click', () => mostraForm("uscita"));


// Restrict input to a max of 4 digits before the decimal and 2 after, replacing commas with dots and removing invalid characters
function controllaImporto(input) {
    input.addEventListener("input", () => {
        input.value = input.value
            .replace(",", ".")
            .replace(/[^0-9.]/g, "")
            .replace(/^(\d{0,4})(\.\d{0,2})?.*$/, "$1$2");
    });
}

// Apply validation to income and expense input fields
const importoUscita = $("importo-uscita");
const importoEntrata = $("importo-entrata");

controllaImporto(importoUscita);
controllaImporto(importoEntrata);


// Creates and returns a <tr> element representing a single transaction
function creaMovimento(m) {
    const tr = document.createElement("tr");
    tr.dataset.id = m.id;

    const valori = [
        new Date(m.data).toLocaleDateString("it-IT"),
        m.categoria.charAt(0).toUpperCase() + m.categoria.slice(1),
        m.tipo === "entrata" ? "Entrata" : "Uscita",
        (m.tipo === "entrata" ? "+" : "-") + m.importo.toFixed(2) + " €"
    ];

    valori.forEach((val, i) => {
        const td = document.createElement("td");
        td.textContent = val;
        if (i >= 2) td.className = m.tipo === "entrata" ? "positivo" : "negativo";
        tr.appendChild(td);
    });

    const tdAzioni = document.createElement("td");
    const btnElimina = document.createElement("span");
    btnElimina.classList.add("action-elimina");
    btnElimina.innerHTML = '<img src="./assets/icons/basket.png" alt="Elimina" width="20" height="20">';
    btnElimina.addEventListener("click", () => eliminaMovimento(m.id));
    tdAzioni.appendChild(btnElimina);
    tr.appendChild(tdAzioni);

    return tr;
}


// Initially renders all transactions when loading the page
function mostraMovimenti() {
    const lista = $$(".spese-list");
    lista.innerHTML = "";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Data", "Categoria", "Tipo", "Importo", "Azioni"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    lista.appendChild(thead);


    const tbody = document.createElement("tbody");
    lista.appendChild(tbody);

    if (MOVIMENTI.length === 0) {
        const tr = document.createElement("tr");
        tr.classList.add("avviso-nessuna-transazione");
        tr.innerHTML = `<td colspan="5">Non sono presenti transazioni</td>`;
        tbody.appendChild(tr);
        return;
    }

    // Sort transactions by date (latest first)
    MOVIMENTI.sort((a, b) => new Date(b.data) - new Date(a.data));
    MOVIMENTI.forEach(m => tbody.appendChild(creaMovimento(m)));
}


// Shows an alert if a required field is empty
function mostraAlert() {
    const formContainer = $("transazioni");
    if (!formContainer.querySelector(".alert-error")) {
        const alert = document.createElement("div");
        alert.classList.add("alert-error");
        alert.textContent = "⚠️ Tutti i campi sono obbligatori";
        formContainer.appendChild(alert);
        setTimeout(() => alert.remove(), 2000);
    }
}


// Calculates and updates total income, total expenses, and balance
function aggiornaTotali() {
    let totaleEntrate = 0;
    let totaleUscite = 0;

    MOVIMENTI.forEach(m => m.tipo === "entrata" ? totaleEntrate += m.importo : totaleUscite += m.importo);

    $$(".totale-entrate").textContent = "+ " + totaleEntrate.toFixed(2) + " €";
    $$(".totale-spese").textContent = "- " + totaleUscite.toFixed(2) + " €";
    $$(".saldo-totale").textContent = (totaleEntrate - totaleUscite).toFixed(2) + " €";
}


// Generates a unique ID for each transaction using the modern crypto.randomUUID() method if available
function generateId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function')
    return crypto.randomUUID();

    return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    }


// Adds a new transaction, updates totals, and appends only the new row to the table for better performance
function aggiungiMovimento(tipo) {
    const transazioneID = generateId();
    const importoEl = $(`importo-${tipo}`);
    const categoriaEl = $(`categoria-${tipo}`);
    const dataEl = $(`data-${tipo}`);

    const valoreImporto = parseFloat(importoEl.value.replace(',', '.'));
    const valoreCategoria = categoriaEl.value;
    const valoreData = dataEl.value;

    if (isNaN(valoreImporto) || valoreImporto <= 0 || !valoreCategoria || !valoreData) {
        mostraAlert();
        return;
        }

    const nuovoMovimento = {
        id: generateId(),
        tipo: tipo,
        importo: valoreImporto,
        categoria: valoreCategoria,
        data: valoreData
    };

    MOVIMENTI.push(nuovoMovimento);
    salvaMovimenti();
    aggiornaTotali();
    mostraMovimenti();

    importoEl.value = "";
    categoriaEl.value = "";
    dataEl.value = "";
}

$("aggiungi-uscita").addEventListener("click", () => aggiungiMovimento("uscita"));
$("aggiungi-entrata").addEventListener("click", () => aggiungiMovimento("entrata"));


// Shows a confirmation dialog and removes a transaction if confirmed, updating only the affected row
function eliminaMovimento(id) {
    if (typeof id !== "string") return;

    const boxTransazioni = $$(".spese-list");
    if (boxTransazioni.querySelector(".remove-transaction-alert")) return;

    const alert = document.createElement("div");
    alert.classList.add("remove-transaction-alert");
    alert.setAttribute("role", "alertdialog");
    alert.setAttribute("aria-modal", "true");
    alert.textContent = "Confermi di voler rimuovere la transazione?";

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("buttons-wrapper");
    const btnConferma = document.createElement("button");
    btnConferma.setAttribute("aria-label", "Conferma eliminazione");
    btnConferma.textContent = "Conferma";
    const btnAnnulla = document.createElement("button");
    btnAnnulla.classList.add("secondary-button");
    btnAnnulla.setAttribute("aria-label", "Annulla eliminazione");
    btnAnnulla.textContent = "Annulla";

    btnWrapper.appendChild(btnConferma);
    btnWrapper.appendChild(btnAnnulla);
    alert.appendChild(btnWrapper);
    boxTransazioni.appendChild(alert);

    btnConferma.addEventListener("click", () => {
        const index = MOVIMENTI.findIndex(m => m.id === id);
        if (index !== -1) {
            MOVIMENTI.splice(index, 1);
            salvaMovimenti();
            aggiornaTotali();
            mostraMovimenti();
        }
        alert.remove();
    });

    btnAnnulla.addEventListener("click", () => alert.remove());
}

// Saves the current state of the MOVIMENTI array into localStorage
function salvaMovimenti() {
    localStorage.setItem("movimenti", JSON.stringify(MOVIMENTI));
}


// Loads transactions from localStorage when the app starts
function caricaMovimenti() {
    const dati = JSON.parse(localStorage.getItem("movimenti")) || [];
    MOVIMENTI.length = 0;
    MOVIMENTI.push(...dati);
    mostraMovimenti();
    aggiornaTotali();
}

caricaMovimenti();


// Toggles visibility of the transaction list and rotates the arrow icon accordingly
const mostraTransazioni = $("mostra-transazioni");
const lista = $$(".spese-list");
const icon = $("icon-toggle");

mostraTransazioni.addEventListener('click', () => {
    lista.classList.toggle("hidden");
    icon.style.transform = lista.classList.contains("hidden") ? "rotate(0deg)" : "rotate(180deg)";
});