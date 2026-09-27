// Temple data
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // Additional temples
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://mail.churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19184,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/e44b3c89b3485fa2f2c8aa09791d4334dfe23511/full/!1200,/0/default"
    },
    {
        templeName: "Hamilton New Zealand",
        location: "Hamilton, New Zealand",
        dedicated: "1958, April, 20",
        area: 44000,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/2ff304d05520229fae54c290f936ba01b20173e5/full/500%2C/0/default"
    }
];


// Display the temples
const displayTemples = (templesToDisplay) => {

    const container = document.querySelector("#temple-container");

    // Clear existing cards
    container.innerHTML = "";

    templesToDisplay.forEach((temple) => {

        // Create temple card
        const card = document.createElement("figure");
        card.classList.add("temple-card");

        // Temple name
        const name = document.createElement("h2");
        name.textContent = temple.templeName;

        // Temple image
        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";

        // Location
        const location = document.createElement("p");
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        // Dedicated date
        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

        // Area
        const area = document.createElement("p");
        area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        // Add elements to card
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);

        // Add card to page
        container.appendChild(card);
    });
};


// Filter functions

// Home - all temples
const showHome = () => {
    displayTemples(temples);
};

// Old - temples before 1900
const showOld = () => {
    const oldTemples = temples.filter((temple) => {
        const year = parseInt(temple.dedicated);
        return year < 1900;
    });

    displayTemples(oldTemples);
};

// New - temples after 2000
const showNew = () => {
    const newTemples = temples.filter((temple) => {
        const year = parseInt(temple.dedicated);
        return year > 2000;
    });

    displayTemples(newTemples);
};

// Large - temples larger than 90,000 square feet
const showLarge = () => {
    const largeTemples = temples.filter((temple) => {
        return temple.area > 90000;
    });

    displayTemples(largeTemples);
};

// Small - temples smaller than 10,000 square feet
const showSmall = () => {
    const smallTemples = temples.filter((temple) => {
        return temple.area < 10000;
    });

    displayTemples(smallTemples);
};


// Navigation events
document.querySelector("#home").addEventListener("click", showHome);
document.querySelector("#old").addEventListener("click", showOld);
document.querySelector("#new").addEventListener("click", showNew);
document.querySelector("#large").addEventListener("click", showLarge);
document.querySelector("#small").addEventListener("click", showSmall);


// Hamburger menu
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});


// Copyright year
const year = document.querySelector("#currentyear");
year.textContent = new Date().getFullYear();


// Last modified date
const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modification: ${document.lastModified}`;


// Display all temples when the page loads
displayTemples(temples);