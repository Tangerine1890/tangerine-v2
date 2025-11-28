// Data is loaded from data.js
const data = dashboardData;

// Constants
const EXCHANGE_RATE_EUR_TO_DH = 10.73;
const EXCHANGE_RATE_DH_TO_EUR = 1 / 10.73;

// State
const state = {
    currentTab: 'overview',
    inventory: [],
    orders: [],
    financials: {}
};

// DOM Elements
const elements = {
    tabs: document.querySelectorAll('nav li'),
    sections: document.querySelectorAll('.tab-content'),
    currentDate: document.getElementById('currentDate'),
    totalRevenue: document.getElementById('totalRevenue'),
    totalOrders: document.getElementById('totalOrders'),
    pendingOrders: document.getElementById('pendingOrders'),
    cashInHand: document.getElementById('cashInHand'),
    ordersGrid: document.getElementById('ordersGrid'), // Changed from Table to Grid
    inventoryGrid: document.getElementById('inventoryGrid'),
    expensesList: document.getElementById('expensesList'),
    finRevenue: document.getElementById('finRevenue'),
    finExpenses: document.getElementById('finExpenses'),
    finLoans: document.getElementById('finLoans'),
    finCashFlow: document.getElementById('finCashFlow'),
    orderSearch: document.getElementById('orderSearch'),
    // New Metrics
    gramsSold: document.getElementById('gramsSold'),
    avgPrice: document.getElementById('avgPrice'),
    teamConso: document.getElementById('teamConso'),
    topProductsList: document.getElementById('topProductsList') // New List container
};

// Initialization
function init() {
    const now = new Date();
    elements.currentDate.textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    processData();
    renderOverview();
    renderOrders();
    renderInventory();
    renderFinancials();
    setupEventListeners();
}

function processData() {
    state.inventory = JSON.parse(JSON.stringify(data.inventory.received));
    state.orders = data.orders;
    state.financials = data.financials;

    // Calculate Stock Levels & Consumption (ONLY for completed orders)
    state.orders.forEach(order => {
        // Skip pending orders for stock calculations
        if (order.status === 'Pending' || order.status === '⏳') return;

        order.items.forEach(item => {
            const product = state.inventory.find(p => p.name === item.name);
            if (product) {
                if (!product.sold) product.sold = 0;
                product.sold += item.quantity;
            }
        });
    });

    state.inventory.forEach(p => {
        p.sold = p.sold || 0;
        p.theoreticalStock = p.quantity - p.sold;

        if (p.actualStock !== undefined) {
            p.currentStock = p.actualStock;
            p.consumption = Math.max(0, p.theoreticalStock - p.actualStock);
        } else {
            p.currentStock = p.theoreticalStock;
            p.consumption = 0;
        }

        p.percentage = Math.max(0, (p.currentStock / p.quantity) * 100);
    });
}

// Currency Helpers
function toDH(amount, currency) {
    if (currency === 'dh' || currency === 'DH') return amount;
    if (currency === '€') return amount * EXCHANGE_RATE_EUR_TO_DH;
    return amount;
}

function formatDH(amount) {
    return `${amount.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} DH`;
}

function formatEuro(amount) {
    return `${amount.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;
}

// --- Rendering Functions ---

function renderOverview() {
    // 1. Total Revenue (Converted to DH)
    const totalRevenueDH = state.orders.reduce((sum, order) => sum + order.total_value_dh, 0);
    elements.totalRevenue.textContent = formatDH(totalRevenueDH);

    // 2. Orders Stats
    elements.totalOrders.textContent = state.orders.length;
    const pending = state.orders.filter(o => o.status === 'Pending' || o.status === '⏳').length;
    elements.pendingOrders.textContent = `${pending} En attente`;

    // 3. Caisse Actuelle (Cash in Hand) - In DH
    let totalInflowDH = 0;
    state.orders.forEach(order => {
        if (order.payment) {
            totalInflowDH += toDH(order.payment.amount, order.payment.currency);
        }
    });

    let totalOutflowDH = 0;
    state.financials.purchases.forEach(purchase => {
        purchase.payments.forEach(p => {
            totalOutflowDH += toDH(p.amount, p.currency);
        });
    });
    state.orders.forEach(order => {
        if (order.delivery_dh) {
            totalOutflowDH += order.delivery_dh;
        }
    });
    if (state.financials.loans) {
        state.financials.loans.forEach(loan => {
            totalOutflowDH += toDH(loan.amount, loan.currency);
        });
    }

    const cashInHand = totalInflowDH - totalOutflowDH;
    if (elements.cashInHand) {
        elements.cashInHand.textContent = formatDH(cashInHand);
        elements.cashInHand.style.color = cashInHand < 0 ? 'var(--danger)' : 'var(--success)';
    }

    // 4. Metrics
    let totalGramsSold = 0;
    let totalConsumedGrams = 0;
    let totalStockGrams = 0; // New Metric

    state.inventory.forEach(p => {
        totalGramsSold += p.sold;
        totalConsumedGrams += p.consumption;
        totalStockGrams += p.currentStock; // Sum current stock
    });

    // Avg Price per Gram (Total Revenue DH / Total Sold Grams)
    const avgPricePerGramDH = totalGramsSold > 0 ? totalRevenueDH / totalGramsSold : 0;

    if (elements.gramsSold) elements.gramsSold.textContent = `${totalGramsSold}g`;
    if (elements.avgPrice) elements.avgPrice.textContent = `${avgPricePerGramDH.toFixed(0)} DH/g`;
    if (elements.teamConso) elements.teamConso.textContent = `${totalConsumedGrams}g`;

    // Add Total Stock Card to Overview if exists (or create it dynamically if not in HTML yet)
    // For now, we assume the user wants it in the "Stock" card which currently shows "Caisse Actuelle"
    // Wait, the user said "un nouveau encadré qui te disent 'Stocks disponibles'".
    // I will inject it into the stats-grid if it doesn't exist.
    let stockCard = document.getElementById('totalStockCard');
    if (!stockCard) {
        const grid = document.querySelector('.stats-grid');
        if (grid) {
            stockCard = document.createElement('div');
            stockCard.className = 'stat-card premium-card';
            stockCard.id = 'totalStockCard';
            stockCard.innerHTML = `
                <div class="icon-box stock" style="background: rgba(14, 165, 233, 0.15); color: #0ea5e9;"><i class="fa-solid fa-cubes"></i></div>
                <div class="stat-info">
                    <h3>Stock Dispo.</h3>
                    <p class="value" id="totalStockValue">0g</p>
                    <span class="subtext">En réserve</span>
                </div>
            `;
            grid.insertBefore(stockCard, grid.children[2]); // Insert after Caisse
        }
    }
    const stockValueEl = document.getElementById('totalStockValue');
    if (stockValueEl) stockValueEl.textContent = `${totalStockGrams}g`;

    // 5. Top Products List (Pills)
    renderTopProducts();
}

function renderTopProducts() {
    const listContainer = document.getElementById('topProductsList');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const sortedProducts = [...state.inventory].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5);

    sortedProducts.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'top-product-item';
        const percent = p.sold ? Math.round((p.sold / p.quantity) * 100) : 0;

        item.innerHTML = `
            <div class="rank">#${index + 1}</div>
            <div class="info">
                <div class="name">${p.name}</div>
                <div class="sold">${p.sold || 0}g vendus</div>
            </div>
            <div class="badge">${percent}%</div>
        `;
        listContainer.appendChild(item);
    });
}

function renderOrders() {
    const grid = document.getElementById('ordersGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const reversedOrders = [...state.orders].reverse();

    reversedOrders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'order-card';

        const isCompleted = order.status === 'Completed' || order.status === '✅';
        const statusClass = isCompleted ? 'status-completed' : 'status-pending';
        const statusText = isCompleted ? 'Terminé' : 'En attente';

        // Calculate Order Metrics
        let totalGrams = 0;
        order.items.forEach(i => totalGrams += i.quantity);

        // Avg Price for this order (Total Value DH / Total Grams)
        const avgPriceDH = totalGrams > 0 ? order.total_value_dh / totalGrams : 0;

        // Payment Display (Original Currency)
        let paymentDisplay = "0 DH";
        if (order.payment) {
            paymentDisplay = `${order.payment.amount} ${order.payment.currency}`;
        }

        // Items List
        const itemsHtml = order.items.map(i =>
            `<div class="order-item-row"><span>${i.quantity}g</span> <span>${i.name}</span></div>`
        ).join('');

        card.innerHTML = `
            <div class="order-header">
                <span class="order-id">#${order.id}</span>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="order-location"><i class="fa-solid fa-location-dot"></i> ${order.location}</div>
            
            <div class="order-stats">
                <div class="stat">
                    <span class="label">Volume</span>
                    <span class="val">${totalGrams}g</span>
                </div>
                <div class="stat">
                    <span class="label">Prix/g</span>
                    <span class="val">${avgPriceDH.toFixed(0)} DH</span>
                </div>
            </div>

            <div class="order-items-list">
                ${itemsHtml}
            </div>

            <div class="order-payment">
                <span class="label">Reçu</span>
                <span class="amount">${paymentDisplay}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderInventory() {
    elements.inventoryGrid.innerHTML = '';

    // Add Inventory Summary Section
    let totalStock = 0;
    let totalSold = 0;
    let totalConso = 0;
    state.inventory.forEach(p => {
        totalStock += p.currentStock;
        totalSold += p.sold;
        totalConso += p.consumption;
    });

    const summaryContainer = document.createElement('div');
    summaryContainer.className = 'inventory-summary';
    summaryContainer.innerHTML = `
        <div class="inv-summary-card">
            <div class="icon"><i class="fa-solid fa-cubes"></i></div>
            <div class="info">
                <h4>Stock Total</h4>
                <div class="val">${totalStock}g</div>
            </div>
        </div>
        <div class="inv-summary-card">
            <div class="icon" style="color: var(--success);"><i class="fa-solid fa-weight-hanging"></i></div>
            <div class="info">
                <h4>Total Vendu</h4>
                <div class="val">${totalSold}g</div>
            </div>
        </div>
        <div class="inv-summary-card">
            <div class="icon" style="color: var(--danger);"><i class="fa-solid fa-fire"></i></div>
            <div class="info">
                <h4>Conso. Équipe</h4>
                <div class="val">${totalConso}g</div>
            </div>
        </div>
    `;
    elements.inventoryGrid.appendChild(summaryContainer);

    // Add Pending Stock Banner
    if (data.inventory.incoming && data.inventory.incoming.length > 0) {
        const pendingBanner = document.createElement('div');
        pendingBanner.className = 'pending-stock-banner';
        const totalPending = data.inventory.incoming.reduce((sum, p) => sum + p.quantity, 0);
        pendingBanner.innerHTML = `
            <div class="icon"><i class="fa-solid fa-truck"></i></div>
            <div class="info">
                <h4>Stock en Route</h4>
                <p>${totalPending}g de Double Static Mix arrive bientôt</p>
            </div>
        `;
        elements.inventoryGrid.appendChild(pendingBanner);
    }

    // Section Header
    const sectionHeader = document.createElement('h3');
    sectionHeader.style.marginBottom = '1rem';
    sectionHeader.style.fontSize = '1.1rem';
    sectionHeader.style.color = 'var(--text-secondary)';
    sectionHeader.innerHTML = '<i class="fa-solid fa-boxes-stacked"></i> État du Stock';
    elements.inventoryGrid.appendChild(sectionHeader);

    // Inventory Cards
    const gridContainer = document.createElement('div');
    gridContainer.className = 'inventory-grid-items';
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    gridContainer.style.gap = '1rem';

    state.inventory.forEach(product => {
        const card = document.createElement('div');
        card.className = 'inventory-card';

        let color = '#10b981';
        if (product.percentage < 20) color = '#ef4444';
        else if (product.percentage < 50) color = '#f59e0b';

        // Visual Breakdown
        // Total Bar = 100%
        // Sold Segment
        // Consumed Segment
        // Remaining Segment
        const soldPct = (product.sold / product.quantity) * 100;
        const consoPct = (product.consumption / product.quantity) * 100;
        const remainPct = (product.currentStock / product.quantity) * 100;

        card.innerHTML = `
            <div class="inv-header">
                <h3>${product.name}</h3>
                <span class="category">${product.category}</span>
            </div>
            
            <div class="inv-stats-row">
                <div class="inv-stat">
                    <span class="label">Stock</span>
                    <span class="val">${product.currentStock}g</span>
                </div>
                <div class="inv-stat">
                    <span class="label">Vendu</span>
                    <span class="val">${product.sold || 0}g</span>
                </div>
                 <div class="inv-stat danger">
                    <span class="label">Conso.</span>
                    <span class="val">-${product.consumption}g</span>
                </div>
            </div>

            <div class="multi-progress-bar">
                <div class="segment sold" style="width: ${soldPct}%"></div>
                <div class="segment conso" style="width: ${consoPct}%"></div>
                <div class="segment remain" style="width: ${remainPct}%"></div>
            </div>
            <div class="progress-labels">
                <span>Vendu</span>
                <span>Conso</span>
                <span>Reste</span>
            </div>
        `;
        gridContainer.appendChild(card);
    });
    elements.inventoryGrid.appendChild(gridContainer);

    if (data.inventory.incoming && data.inventory.incoming.length > 0) {
        const incomingHeader = document.createElement('h3');
        incomingHeader.className = 'section-sub-header';
        incomingHeader.textContent = 'Stock Arrivant 🚚';
        elements.inventoryGrid.appendChild(incomingHeader);

        const incomingGrid = document.createElement('div');
        incomingGrid.style.display = 'grid';
        incomingGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        incomingGrid.style.gap = '1rem';

        data.inventory.incoming.forEach(product => {
            const card = document.createElement('div');
            card.className = 'inventory-card incoming';
            card.innerHTML = `
                <h3>${product.name}</h3>
                <span class="category">${product.category}</span>
                <div class="stock-level">+${product.quantity}g</div>
                <div class="note">${product.note || 'En route'}</div>
            `;
            incomingGrid.appendChild(card);
        });
        elements.inventoryGrid.appendChild(incomingGrid);
    }
}

function renderFinancials() {
    elements.expensesList.innerHTML = '';
    let totalExpensesPaidDH = 0;
    let totalSupplierDebtDH = 0;

    state.financials.purchases.forEach((purchase, index) => {
        let paidDH = 0;
        purchase.payments.forEach(p => {
            paidDH += toDH(p.amount, p.currency);
        });
        totalExpensesPaidDH += paidDH;

        const remainingDH = purchase.total_estimated_dh - paidDH;
        if (remainingDH > 1) totalSupplierDebtDH += remainingDH;

        // Drop Header
        const dropHeader = document.createElement('div');
        dropHeader.className = 'drop-header';
        if (index > 0) dropHeader.style.marginTop = '2rem';

        let dropName = purchase.description;
        if (purchase.description.toLowerCase().includes('premier')) dropName = "Drop #1";
        if (purchase.description.toLowerCase().includes('deuxième')) dropName = "Drop #2";

        dropHeader.innerHTML = `<i class="fa-solid fa-box"></i> ${dropName}`;
        elements.expensesList.appendChild(dropHeader);

        // Detailed Card for Drop
        const card = document.createElement('div');
        card.className = 'financial-card-detail';

        let paymentsHtml = purchase.payments.map((p, i) =>
            `<div class="payment-row"><span>Paiement ${i + 1}</span> <span>${p.amount} ${p.currency}</span></div>`
        ).join('');

        card.innerHTML = `
            <div class="detail-row main">
                <span>Coût Total</span>
                <div class="values">
                    <span class="euro">${formatDH(purchase.total_estimated_dh)}</span>
                </div>
            </div>
            <div class="divider-dashed"></div>
            ${paymentsHtml}
            <div class="divider"></div>
            <div class="detail-row total">
                <span>Reste à payer</span>
                <span class="${remainingDH > 1 ? 'danger-text' : 'success-text'}">
                    ${remainingDH > 1 ? formatDH(remainingDH) : '0 DH'}
                </span>
            </div>
        `;
        elements.expensesList.appendChild(card);
    });

    // Loans
    let totalLoansDH = 0;
    if (state.financials.loans && state.financials.loans.length > 0) {
        const loanHeader = document.createElement('div');
        loanHeader.className = 'drop-header';
        loanHeader.style.marginTop = '2rem';
        loanHeader.innerHTML = `<i class="fa-solid fa-hand-holding-dollar"></i> Emprunts`;
        elements.expensesList.appendChild(loanHeader);

        state.financials.loans.forEach(loan => {
            const amountDH = toDH(loan.amount, loan.currency);
            totalLoansDH += amountDH;
            const card = document.createElement('div');
            card.className = 'financial-card-detail';
            card.innerHTML = `
                <div class="detail-row main">
                    <span>${loan.from}</span>
                    <span class="danger-text">-${formatDH(amountDH)}</span>
                </div>
            `;
            elements.expensesList.appendChild(card);
        });
    }

    // Summary
    const totalRevenueDH = state.orders.reduce((sum, order) => sum + order.total_value_dh, 0);
    const cashFlow = totalRevenueDH - totalExpensesPaidDH - totalLoansDH;

    elements.finRevenue.textContent = formatDH(totalRevenueDH);
    elements.finExpenses.textContent = `-${formatDH(totalExpensesPaidDH)}`;

    const loansEl = document.getElementById('finLoans');
    if (loansEl) loansEl.textContent = `-${formatDH(totalLoansDH)}`;

    // Add Supplier Debt Row if not exists
    let supplierDebtRow = document.getElementById('finSupplierDebt');
    if (!supplierDebtRow) {
        const profitCalc = document.querySelector('.profit-calc');
        const totalRow = profitCalc.querySelector('.row.total');
        supplierDebtRow = document.createElement('div');
        supplierDebtRow.className = 'row';
        supplierDebtRow.innerHTML = `<span>Dette Fournisseurs</span> <span class="amount negative" id="finSupplierDebt">0 DH</span>`;
        profitCalc.insertBefore(supplierDebtRow, totalRow); // Insert before Total

        // Add divider before total if needed
        const divider = document.createElement('div');
        divider.className = 'divider';
        profitCalc.insertBefore(divider, totalRow);
    }
    document.getElementById('finSupplierDebt').textContent = `-${formatDH(totalSupplierDebtDH)}`;

    elements.finCashFlow.textContent = formatDH(cashFlow);
    elements.finCashFlow.style.color = cashFlow >= 0 ? 'var(--success)' : 'var(--danger)';
}

function setupEventListeners() {
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            elements.tabs.forEach(t => t.classList.remove('active'));
            elements.sections.forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });

    elements.orderSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = elements.ordersGrid.querySelectorAll('.order-card');
        cards.forEach(card => {
            card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', init);
