import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [output, setOutput] = useState(0);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");

  useEffect(() => {
    async function getExchangeRate() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        if (!res.ok)
          throw Error("Something went wrong fetching exchange rates");
        const data = await res.json();
        setOutput(parseFloat(data.rates[toCurrency]).toFixed(2));
      } catch (err) {
        console.error(err);
        // Handle errors here, e.g., set an error state or display an error message.
      }
    }

    if (amount !== "") {
      getExchangeRate();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {toCurrency}
      </p>
    </div>
  );
}
