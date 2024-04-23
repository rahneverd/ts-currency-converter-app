#! /usr/bin/env node
import inquirer from "inquirer";
const currencyRates = [
    {
        Currency: "USD",
        Rate: 1
    },
    {
        Currency: "PKR",
        Rate: 277
    },
    {
        Currency: "EUR",
        Rate: 0.85
    },
    {
        Currency: "GBP",
        Rate: 0.72
    }
];
const fromCurrencyPrompt = await inquirer.prompt([
    {
        type: "list",
        name: "fromCurrency",
        message: "Select the currency you want to convert from:",
        choices: currencyRates.map(rate => rate.Currency)
    }
]);
const toCurrencyPrompt = await inquirer.prompt([
    {
        type: "list",
        name: "toCurrency",
        message: "Select the currency you want to convert to:",
        choices: currencyRates.map(rate => rate.Currency).filter(currency => currency !== fromCurrencyPrompt.fromCurrency)
    }
]);
const amountPrompt = await inquirer.prompt([
    {
        type: "number",
        name: "amount",
        message: "Enter the amount you want to convert:",
        filter: (input) => parseInt(input),
        validate: (input) => !isNaN(parseFloat(input))
    }
]);
const fromCurrency = currencyRates.find(rate => rate.Currency === fromCurrencyPrompt.fromCurrency);
const toCurrency = currencyRates.find(rate => rate.Currency === toCurrencyPrompt.toCurrency);
if (!fromCurrency || !toCurrency) {
    console.log("Invalid currency selection!");
}
else {
    const convertedAmount = (amountPrompt.amount * (toCurrency.Rate / fromCurrency.Rate));
    console.log(`The converted amount is: ${convertedAmount}`);
}
