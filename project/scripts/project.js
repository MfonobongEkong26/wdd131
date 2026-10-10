// Serverbase Engineering Limited
// WDD 131 Final Project

// 1. Update the copyright year on every page.
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll(".current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = `${currentYear}`;
    });
}

// 2. Set up the responsive navigation menu.
function setupNavigation() {
    const menuButton = document.querySelector("#menu-toggle");
    const navigation = document.querySelector("#site-nav");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", `${isOpen}`);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

// 3. Service filtering using arrays and array methods.
function setupServiceFilters() {
    const filterButtons = document.querySelectorAll("[data-service-filter]");
    const serviceCards = document.querySelectorAll("#service-list .service-card");
    const emptyMessage = document.querySelector("#service-empty");

    if (filterButtons.length === 0 || serviceCards.length === 0) {
        return;
    }

    function filterServices(category) {
        let visibleCount = 0;

        serviceCards.forEach((card) => {
            const categoryLabel = card.querySelector(".card-number");
            const cardCategory = categoryLabel.textContent
                .split("/")
                .pop()
                .trim()
                .toLowerCase();

            const shouldShow =
                category === "all" || cardCategory === category;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        emptyMessage.hidden = visibleCount > 0;

        filterButtons.forEach((button) => {
            const isActive =
                button.dataset.serviceFilter === category;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", `${isActive}`);
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterServices(button.dataset.serviceFilter);
        });
    });
}

// 4. Project data stored in an array of objects.
const projects = [
    {
        id: 1,
        title: "Modern Family Residence",
        category: "residential",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        alt: "Modern family residence with contemporary architecture",
        description: "An illustrative residential concept focused on comfortable living spaces, practical planning, and a modern exterior."
    },
    {
        id: 2,
        title: "Commercial Office Building",
        category: "commercial",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
        alt: "Contemporary commercial office building",
        description: "A commercial building concept emphasizing functional workspaces, circulation, and a professional appearance."
    },
    {
        id: 3,
        title: "Residential Renovation",
        category: "renovation",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
        alt: "Renovated home interior with modern finishes",
        description: "An illustrative renovation concept exploring improvements to interior layout, finishes, and everyday usability."
    },
    {
        id: 4,
        title: "Urban Apartment Concept",
        category: "residential",
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
        alt: "Modern multi-storey residential building",
        description: "A residential concept illustrating the planning considerations of shared spaces and multi-storey living."
    },
    {
        id: 5,
        title: "Commercial Interior Upgrade",
        category: "commercial",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        alt: "Organized modern office interior",
        description: "A workplace improvement concept centered on efficient layouts, useful shared spaces, and a welcoming environment."
    },
    {
        id: 6,
        title: "Home Improvement Concept",
        category: "renovation",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        alt: "Bright renovated residential interior",
        description: "An illustrative home improvement concept exploring finishes, lighting, and more effective use of space."
    }
];

// 5. Generate project cards dynamically.
function displayProjects(projectList) {
    const projectContainer = document.querySelector("#project-list");
    const emptyMessage = document.querySelector("#project-empty");

    if (!projectContainer) {
        return;
    }

    projectContainer.innerHTML = projectList.map((project) => `
        <article class="project-card">
            <img
                src="${project.image}"
                alt="${project.alt}"
                width="900"
                height="600"
                loading="lazy">
            <div class="card-body">
                <span class="project-tag">${project.category}</span>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <p><strong>Project type:</strong> ${project.category}</p>
            </div>
        </article>
    `).join("");

    if (emptyMessage) {
        emptyMessage.hidden = projectList.length > 0;
    }
}

// 6. Filter projects with the array filter() method.
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll("[data-project-filter]");

    if (filterButtons.length === 0) {
        return;
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.projectFilter;

            const filteredProjects = projects.filter((project) => {
                return category === "all" || project.category === category;
            });

            displayProjects(filteredProjects);

            filterButtons.forEach((filterButton) => {
                const isActive =
                    filterButton.dataset.projectFilter === category;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", `${isActive}`);
            });
        });
    });
}

// 7. Track project page visits with localStorage.
function trackProjectVisits() {
    const counter = document.querySelector("#project-visit-count");

    if (!counter) {
        return;
    }

    let visitCount = Number(localStorage.getItem("serverbaseProjectVisits")) || 0;
    visitCount++;

    localStorage.setItem("serverbaseProjectVisits", `${visitCount}`);
    counter.textContent = `${visitCount}`;
}

// 8. Validate the enquiry form and store a local demonstration record.
function setupContactForm() {
    const contactForm = document.querySelector("#contact-form");
    const messageElement = document.querySelector("#form-message");

    if (!contactForm || !messageElement) {
        return;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);

        const enquiry = {
            name: formData.get("name").trim(),
            email: formData.get("email").trim(),
            service: formData.get("service"),
            message: formData.get("message").trim(),
            submittedAt: new Date().toISOString()
        };

        if (!enquiry.name || !enquiry.email || !enquiry.message) {
            messageElement.textContent =
                "Please complete all required fields.";
            messageElement.className = "form-message error";
            return;
        }

        const savedEnquiries = JSON.parse(
            localStorage.getItem("serverbaseEnquiries") || "[]"
        );

        savedEnquiries.push(enquiry);

        localStorage.setItem(
            "serverbaseEnquiries",
            JSON.stringify(savedEnquiries)
        );

        messageElement.textContent =
            `Thank you, ${enquiry.name}. Your ${enquiry.service.toLowerCase()} enquiry has been saved in this browser. This demonstration does not send email.`;

        messageElement.className = "form-message success";
        contactForm.reset();
    });
}

// 9. Initialize page functionality.
function initializeWebsite() {
    updateCopyrightYear();
    setupNavigation();
    setupServiceFilters();
    displayProjects(projects);
    setupProjectFilters();
    trackProjectVisits();
    setupContactForm();
}

initializeWebsite();