import { useState, useEffect } from "react";

export default function InputOutput() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('jpy')
  const [rate, setRate] = useState(0)
  const [conversionCurrencySymbol, setConversionCurrencySymbol] = useState('$')
  const apiKey = import.meta.env.PUBLIC_API_KEY

  useEffect(() => {
    async function fetchRate() {
      const fetchUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`
      const response = await fetch(fetchUrl)
      const responseObj = await response.json()
      const conversionCurrency = currency == 'jpy' ? 'USD' : 'JPY'
      setConversionCurrencySymbol(conversionCurrency == 'JPY' ? '¥' : '$')
      setRate(responseObj['conversion_rates'][conversionCurrency])
    }
    fetchRate()
  }, [currency])

  const handleCurrencyChange = async(e) => {
    const newValue = e.target.value
    if (newValue === 'jpy' || newValue === 'usd') setCurrency(newValue)
    
    // const fetchUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`
    // const response = await fetch(fetchUrl)
    // const responseObj = await response.json()
    // const conversionCurrency = currency == 'jpy' ? 'USD' : 'JPY'
    // setConversionCurrencySymbol(conversionCurrency == 'JPY' ? '¥' : '$')
    // setRate(responseObj['conversion_rates'][conversionCurrency])
  }
  const handleInput = async(e) => {
    const inputAmount = e?.target?.value ?? 0;
    const amount = rate * inputAmount
    setAmount(amount);
  };
  return(
    <section>
      <input type="number" className="bg-neutral-50 h-6" onChange={handleInput} />
      <select name="currency" id="currency" className="bg-neutral-50 h-6" onChange={handleCurrencyChange}>
        <option value="jpy">jpy</option>
        <option value="usd">usd</option>
      </select>
      <section>
        {conversionCurrencySymbol}{amount.toFixed(2)}
      </section>
    </section>
  )
}