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
    hdfc: {
    name: "HDFC Bank",
    sector: "Banking",
    prices: [1500, 1520, 1490, 1550, 1580]
  },
  icici: {
    name: "ICICI Bank",
    sector: "Banking",
    prices: [900, 920, 940, 930, 950]
  },
  sbi: {
    name: "SBI",
    sector: "Banking",
    prices: [600, 620, 610, 630, 650]
  },
  airtel: {
    name: "Bharti Airtel",
    sector: "Telecom",
    prices: [800, 820, 840, 830, 860]
  },
  wipro: {
    name: "Wipro",
    sector: "IT",
    prices: [400, 410, 420, 415, 430]
  },
  hcl: {
    name: "HCL Tech",
    sector: "IT",
    prices: [1100, 1120, 1150, 1130, 1170]
  },
  lnt: {
    name: "Larsen & Toubro",
    sector: "Construction",
    prices: [2000, 2050, 2100, 2080, 2150]
  },
  itc: {
    name: "ITC",
    sector: "FMCG",
    prices: [300, 310, 320, 315, 330]
  },
  maruti: {
    name: "Maruti Suzuki",
    sector: "Automobile",
    prices: [9000, 9200, 9400, 9300, 9500]
  },
  tataMotors: {
    name: "Tata Motors",
    sector: "Automobile",
    prices: [700, 720, 740, 730, 760]
  },
  sunpharma: {
    name: "Sun Pharma",
    sector: "Pharma",
    prices: [1000, 1020, 1040, 1030, 1060]
  },
  ongc: {
    name: "ONGC",
    sector: "Energy",
    prices: [150, 155, 160, 158, 165]
  },
  ntpc: {
    name: "NTPC",
    sector: "Power",
    prices: [250, 255, 260, 258, 265]
  },
  adani: {
    name: "Adani Enterprises",
    sector: "Infrastructure",
    prices: [2200, 2250, 2300, 2280, 2350]
  },
  asianPaints: {
    name: "Asian Paints",
    sector: "FMCG",
    prices: [3000, 3050, 3100, 3080, 3150]
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
