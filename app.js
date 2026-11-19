const serviceKeys = ["civil", "plumbing", "electrical"];
const modal = document.getElementById("booking-modal");
const modalPanel = modal.querySelector(".modal-panel");
const menuButton = document.getElementById("mobile-menu-button");
const menu = document.getElementById("mobile-menu");
let expandedService = null;
let modalOpener = null;
let previousBodyOverflow = "";

function highlightService(serviceKey) {
    serviceKeys.forEach((key) => {
        const card = document.getElementById(`card-${key}`);
        const tile = document.getElementById(`tile-${key}`);
        const active = serviceKey === key;

        card.classList.toggle("service-card-active", active);
        tile.classList.toggle("highlighted", active);
        tile.classList.toggle("dimmed", serviceKey !== "all" && !active);
    });
}

function setMenuOpen(isOpen) {
    menu.classList.toggle("is-open", isOpen);
    menu.setAttribute("aria-hidden", String(!isOpen));
    menu.inert = !isOpen;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

function openModal() {
    modalOpener = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    modal.inert = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.classList.remove("opacity-0", "pointer-events-none");
    modalPanel.classList.remove("scale-95");
    modalPanel.classList.add("scale-100");
    modal.querySelector("[data-close-modal]").focus();
}

function closeModal() {
    modal.classList.add("opacity-0", "pointer-events-none");
    modalPanel.classList.remove("scale-100");
    modalPanel.classList.add("scale-95");
    modal.setAttribute("aria-hidden", "true");
    modal.inert = true;
    document.body.style.overflow = previousBodyOverflow;

    if (modalOpener instanceof HTMLElement) {
        modalOpener.focus();
    }
}

document.querySelectorAll(".service-card").forEach((card) => {
    const key = card.dataset.service;
    const details = document.getElementById(card.getAttribute("aria-controls"));

    card.addEventListener("click", () => {
        const isExpanded = card.getAttribute("aria-expanded") === "true";
        document.querySelectorAll(".service-card").forEach((item) => {
            const itemDetails = document.getElementById(item.getAttribute("aria-controls"));
            const itemIsOpen = item === card && !isExpanded;

            item.setAttribute("aria-expanded", String(itemIsOpen));
            item.classList.toggle("service-expanded", itemIsOpen);
            itemDetails.setAttribute("aria-hidden", String(!itemIsOpen));
            itemDetails.inert = !itemIsOpen;
            item.querySelector(".service-chevron").classList.toggle("rotate-180", itemIsOpen);
        });

        expandedService = isExpanded ? null : key;
        highlightService(expandedService ?? "all");
    });

    card.addEventListener("pointerenter", () => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            highlightService(key);
        }
    });

    card.addEventListener("focus", () => highlightService(key));
});

document.getElementById("service-list").addEventListener("pointerleave", () => {
    highlightService(expandedService ?? "all");
});

menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
    button.addEventListener("click", openModal);
});

modal.querySelector("[data-close-modal]").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (!modal.inert) {
            closeModal();
        } else if (menuButton.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuButton.focus();
        }
    }

    if (event.key === "Tab" && !modal.inert) {
        const focusable = [...modal.querySelectorAll("a[href], button:not([disabled])")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

window.matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
    if (event.matches && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
    }
});

document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
        image.closest(".service-img-tile, .expert-photo")?.classList.add("image-error");
    });
});
