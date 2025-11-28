const dashboardData = {
    inventory: {
        received: [
            { category: "WPFF", name: "Tropicali", quantity: 50, unit: "g", actualStock: 5 },
            { category: "WPFF", name: "Kush Mints", quantity: 50, unit: "g" },
            { category: "Double Static", name: "Tropi Tangie", quantity: 50, unit: "g", actualStock: 10 },
            { category: "Double Static", name: "Tropical Cherry", quantity: 50, unit: "g", actualStock: 30 },
            { category: "Double Static", name: "Tchuqita Banana", quantity: 150, unit: "g", actualStock: 75 },
            { category: "Double Static", name: "Gelato Cheesecake", quantity: 100, unit: "g", actualStock: 68 },
            { category: "Double Static", name: "MAC", quantity: 50, unit: "g" },
            { category: "Fresh Frozen", name: "Grape Pie x Biscotti", quantity: 500, unit: "g", actualStock: 250 }
        ],
        incoming: [
            { category: "Double Static", name: "Mix", quantity: 500, unit: "g", note: "2nd Purchase" }
        ]
    },
    financials: {
        purchases: [
            {
                id: 1,
                description: "Premier achat de produit",
                total_estimated_dh: 24000,
                payments: [
                    { amount: 8000, currency: "dh" },
                    { amount: 7000, currency: "dh" },
                    { amount: 750, currency: "€" }
                ]
            },
            {
                id: 2,
                description: "Deuxième achat de produit",
                total_estimated_dh: 17000,
                payments: [
                    { amount: 9000, currency: "dh" }
                ]
            }
        ],
        loans: [
            { from: "Omar", amount: 1000, currency: "dh" }
        ]
    },
    orders: [
        {
            id: 1,
            location: "Unknown",
            status: "Completed",
            items: [
                { name: "Tchuqita Banana", category: "Double Static", quantity: 5 },
                { name: "Tropi Tangie", category: "Double Static", quantity: 5 },
                { name: "Gelato Cheesecake", category: "Double Static", quantity: 5 },
                { name: "MAC", category: "Double Static", quantity: 5 },
                { name: "Tropicali", category: "WPFF", quantity: 2.5 },
                { name: "Kush Mints", category: "WPFF", quantity: 2.5 }
            ],
            total_value_dh: 3700,
            payment: { amount: 350, currency: "€" }
        },
        {
            id: 2,
            location: "Casablanca",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 20 },
                { name: "Tropicali", category: "WPFF", quantity: 9 },
                { name: "Kush Mints", category: "WPFF", quantity: 7.5 },
                { name: "Tchuqita Banana", category: "Double Static", quantity: 10 }
            ],
            total_value_dh: 5940,
            delivery_dh: 360,
            payment: { amount: 600, currency: "€" }
        },
        {
            id: 3,
            location: "Unknown",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 6 },
                { name: "Tropicali", category: "WPFF", quantity: 5 },
                { name: "Tchuqita Banana", category: "Double Static", quantity: 12 }
            ],
            total_value_dh: 2580,
            payment: { amount: 250, currency: "€" }
        },
        {
            id: 4,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 6 }
            ],
            total_value_dh: 500,
            payment: { amount: 500, currency: "dh" }
        },
        {
            id: 5,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Tchuqita Banana", category: "Double Static", quantity: 10 }
            ],
            total_value_dh: 880, // Approx based on payment
            payment: { amount: 80, currency: "€" }
        },
        {
            id: 6,
            location: "Casablanca",
            status: "Completed",
            items: [
                { name: "Tropicali", category: "WPFF", quantity: 17 },
                { name: "Tchuqita Banana", category: "Double Static", quantity: 10 },
                { name: "Gelato Cheesecake", category: "Double Static", quantity: 10 },
                { name: "Tropi Tangie", category: "Double Static", quantity: 10 }
            ],
            total_value_dh: 7260,
            payment: { amount: 670, currency: "€" }
        },
        {
            id: 7,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 6 }
            ],
            total_value_dh: 300,
            payment: { amount: 300, currency: "dh" }
        },
        {
            id: 8,
            location: "Marrakech",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 8 },
                { name: "Gelato Cheesecake", category: "Double Static", quantity: 5 },
                { name: "Tchuqita Banana", category: "Double Static", quantity: 5 }
            ],
            total_value_dh: 1980, // Approx
            payment: { amount: 180, currency: "€" }
        },
        {
            id: 9,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 6 }
            ],
            total_value_dh: 300,
            payment: { amount: 300, currency: "dh" }
        },
        {
            id: 10,
            location: "Marrakech",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 5 },
                { name: "Tchuqita Banana", category: "Double Static", quantity: 5 }
            ],
            total_value_dh: 1210, // Approx
            payment: { amount: 110, currency: "€" }
        },
        {
            id: 11,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 7 } // User said 7g total 6g? Assuming 7g based on line 1
            ],
            total_value_dh: 350,
            payment: { amount: 350, currency: "dh" }
        },
        {
            id: 12,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 2, isFree: true },
                { name: "Kush Mints", category: "WPFF", quantity: 5 },
                { name: "Tropical Cherry", category: "Double Static", quantity: 5 }
            ],
            total_value_dh: 1760, // Approx
            payment: { amount: 2000, currency: "dh" } // Wait, user wrote 2000dh in summary list but 200€ in detail? List says 12. 2000dh. Detail says Paiement = 200 €. I will use 2000dh as per list item 12.
        },
        {
            id: 13,
            location: "Marrakech",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 100 }
            ],
            total_value_dh: 6600, // Approx
            payment: { amount: 600, currency: "€" }
        },
        {
            id: 14,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 15 }
            ],
            total_value_dh: 600,
            payment: { amount: 600, currency: "dh" }
        },
        {
            id: 15,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 6 }
            ],
            total_value_dh: 200,
            payment: { amount: 200, currency: "dh" }
        },
        {
            id: 16,
            location: "Rabat",
            status: "Completed",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 8 }
            ],
            total_value_dh: 300,
            payment: { amount: 300, currency: "dh" }
        },
        {
            id: 17,
            location: "Rabat",
            status: "Pending",
            items: [
                { name: "Grape Pie x Biscotti", category: "Fresh Frozen", quantity: 25 }
            ],
            total_value_dh: 1300,
            payment: { amount: 1300, currency: "dh" }
        }
    ]
};
