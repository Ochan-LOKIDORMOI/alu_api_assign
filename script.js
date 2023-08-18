document.addEventListener("DOMContentLoaded", () => {
    const convertBtn = document.getElementById("convertBtn");
    const resultElement = document.getElementById("result");

    const currencyNames = {};

    // Fetch currency data from REST Countries API
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const currencies = country.currencies || {};
                Object.keys(currencies).forEach(currencyCode => {
                    const currencyName = currencies[currencyCode].name;
                    currencyNames[currencyCode] = currencyName;
                });
            });

            //  'from' and 'to' dropdowns with currency options
            populateDropdown("from", currencyNames);
            populateDropdown("to", currencyNames);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    //function to populate dropdown options
    function populateDropdown(dropdownId, optionsMap) {
        const dropdown = document.getElementById(dropdownId);
        for (const code in optionsMap) {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${code} - ${optionsMap[code]}`;
            dropdown.appendChild(option);
        }
    }

    convertBtn.addEventListener("click", async () => {
        const amount = parseFloat(document.getElementById("amount").value);
        const fromCurrency = document.getElementById("from").value;
        const toCurrency = document.getElementById("to").value;

        // Fetch conversion data from your API
        const conversionEndpoint = "https://rapidapi.com/apininjas/api/currency-converter-by-api-ninjas"; // Replace with the actual endpoint
        try {
            const response = await fetch(conversionEndpoint);
            const data = await response.json();

            // Response contains the required properties
            if (data.new_amount !== undefined && data.new_currency !== undefined) {
                const convertedAmount = parseFloat(data.new_amount);
                const resultText = `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(5)} ${data.new_currency}`;
                resultElement.textContent = resultText;
            } else {
                resultElement.textContent = "Conversion data is missing or incorrect. Please try again.";
            }
        } catch (error) {
            console.error("Error fetching conversion data:", error);
            resultElement.textContent = "An error occurred. Please try again later.";
        }
    });
});
