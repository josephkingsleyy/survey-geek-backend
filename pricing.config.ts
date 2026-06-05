export const PRICING_CONFIG = {
    targetResponse: {
        general: {
            rates: [
                { max: 100, rate: 50 },
                { max: 500, rate: 45 },
                { max: 1000, rate: 40 },
                { max: Infinity, rate: 30 },
            ],
        },
        specific: {
            rates: [
                { max: 100, rate: 100 },
                { max: 500, rate: 90 },
                { max: 1000, rate: 80 },
                { max: Infinity, rate: 60 },
            ],
        },
    },

    timeline: {
        standard: 42000,
        fast: 49000,
        urgent: 50000,
        open: 2000,
    },

    modeOfCollection: {
        online: 10000,
        field: 20000,
        hybrid: 40000,
    },

    questionBase: {
        tiers: [
            { max: 10, fee: 5000 },
            { max: 20, fee: 10000 },
            { max: 40, fee: 20000 },
            { max: Infinity, fee: 20000 },
        ],
    },

    support: {
        "cleaned-dataset": 50000,
        "charts-and-visualizations": 100000,
        "statistical-analysis": 150000,
        dashboard: 200000,
        "full-report": 300000,
        "presentation-slides": 250000,
        none: 0,
    },
};