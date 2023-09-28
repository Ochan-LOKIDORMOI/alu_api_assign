document.addEventListener('DOMContentLoaded', () => {
    const convertBtn = document.getElementById('convertBtn');
    const resultElement = document.getElementById('result');
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const amountInput = document.getElementById('amount');

    // "From" and "To" dropdowns with countries and their currencies
    const countriesAndCurrencies = [
        { code: 'USD', name: 'United States Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound Sterling' },
        // more countries and currencies to be added....
    ];

    countriesAndCurrencies.forEach(country => {
        const optionFrom = document.createElement('option');
        optionFrom.value = country.code;
        optionFrom.textContent = `${country.name} (${country.code})`;

        const optionTo = document.createElement('option');
        optionTo.value = country.code;
        optionTo.textContent = `${country.name} (${country.code})`;

        fromSelect.appendChild(optionFrom);
        toSelect.appendChild(optionTo);
    });

    convertBtn.addEventListener('click', async () => {
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;
        const conversionAmount = amountInput.value;

        const url = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${fromCurrency}&want=${toCurrency}&amount=${conversionAmount}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dd13f9ffe9msh39c733169cb6fddp157467jsna2babf0a3187',
                'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const results = await response.text();
            const result = document.getElementById("result");
            const ressults = JSON.parse(results);
            result.innerHTML = ressults.new_amount;
        } catch (error) {
            console.error(error);
        }
  });
});