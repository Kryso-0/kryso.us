---
title: XRPL Node Kryso
layout: default
---

# 🏆 Welcome
You found a node on the **XRP Ledger**.

<select>
  <option value="info">Node Information</option>
  <option value="explorer">Ledger Explorer</option>
</select>

## 🔗 Latest Ledgers
<div id="ledger-container"></div>

<style>
  body {
      background-color: black;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
  }
  h1 {
      font-size: 5rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
  }
  p {
      font-size: 1.5rem;
      margin-bottom: 20px;
  }
  select {
      font-size: 1.2rem;
      padding: 10px;
      border: none;
      background-color: white;
      color: black;
      cursor: pointer;
      border-radius: 5px;
  }
  #ledger-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      overflow: hidden;
      width: 80%;
      white-space: nowrap;
  }
  .ledger-block {
      display: inline-block;
      width: 200px;
      height: auto;
      padding: 10px;
      text-align: center;
      font-size: 1rem;
      transition: transform 0.5s ease-in-out;
  }
</style>

<script>
  const ledgerContainer = document.getElementById("ledger-container");
  const ws = new WebSocket("wss://xrplcluster.com");
  let ledgers = [];
  
  ws.onopen = function() {
      ws.send(JSON.stringify({"id": 1, "command": "subscribe", "streams": ["ledger"]}));
  };
  
  ws.onmessage = function(event) {
      const response = JSON.parse(event.data);
      if (response.type === "ledgerClosed") {
          const newLedger = {
              index: response.ledger_index,
              transactions: response.txn_count,
              burned: response.fee_base / 1000000 + " XRP" // Convert drops to XRP
          };
          
          if (ledgers.length >= 5) {
              ledgers.shift(); // Remove the oldest ledger to keep only 5
          }
          ledgers.push(newLedger);
          updateLedgers();
      }
  };

  function updateLedgers() {
      ledgerContainer.innerHTML = "";
      ledgers.forEach(ledger => {
          const div = document.createElement("div");
          div.className = "ledger-block w3-card w3-padding w3-border-white";
          div.innerHTML = `
              <strong>Ledger:</strong> ${ledger.index}<br>
              <strong>Txns:</strong> ${ledger.transactions}<br>
              <strong>Burned:</strong> ${ledger.burned}
          `;
          ledgerContainer.appendChild(div);
      });
  }
</script>
