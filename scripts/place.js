// Copyright year
const year = document.querySelector("#currentyear");
year.textContent = new Date().getFullYear();

// Last modified date
const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modification: ${document.lastModified}`;

// Weather values
const temperature = 28;
const windSpeed = 10;

// Calculate wind chill in Celsius
function calculateWindChill(temp, speed) {
    return 13.12 + (0.6215 * temp) - (11.37 * speed ** 0.16) + (0.3965 * temp * speed ** 0.16);
}

// Display the wind chill
const windChill = document.querySelector("#wind-chill");

if (temperature <= 10 && windSpeed > 4.8) {
    const result = calculateWindChill(temperature, windSpeed);
    windChill.textContent = `${result.toFixed(1)} °C`;
} else {
    windChill.textContent = "N/A";
}