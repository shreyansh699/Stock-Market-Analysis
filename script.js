const stocks = {
    reliance: {
        name: "Reliance",
        sector: "Energy",
        prices: [2600, 2700, 2750, 2800, 2900]
    },
    tcs: {
        name: "TCS",
        sector: "IT",
        prices: [3500, 3550, 3600, 3700, 3650]
    },
    infosys: {
        name: "Infosys",
        sector: "IT",
        prices: [1400, 1450, 1500, 1480, 1520]
    }
};

const canvas = document.getElementById("stockChart");
const ctx = canvas.getContext("2d");

/* Trend Logic */
function getTrend(prices) {
    let prev = prices[prices.length - 2];
    let curr = prices[prices.length - 1];

    if (curr > prev) return "Uptrend 📈";
    else if (curr < prev) return "Downtrend 📉";
    else return "Stable ➖";
}

/* Draw Chart */
function drawChart(prices) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const range = max - min || 1;

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    prices.forEach((p, i) => {
        let x = (i / (prices.length - 1)) * canvas.width;
        let y = canvas.height - ((p - min) / range) * canvas.height;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

/* Load Stock */
function loadStock() {
    const selected = document.getElementById("companySelect").value;
    const stock = stocks[selected];

    document.getElementById("stockData").innerHTML = `
        <h3>${stock.name}</h3>
        <p>Sector: ${stock.sector}</p>
        <p>Price: ₹${stock.prices.at(-1)}</p>
        <p>Trend: ${getTrend(stock.prices)}</p>
    `;

    drawChart(stock.prices);
}

/* Initial Load */
window.onload = loadStock;
