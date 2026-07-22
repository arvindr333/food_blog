// Global State for Recipe Filtering
let currentCategory = 'all';
let currentSearchQuery = '';

// Slider logic
document.addEventListener("DOMContentLoaded", () => {
    initSlider();
    initRecipeCheckboxes();
});

function initSlider() {
    const slides = document.querySelectorAll(".hero .slide");
    if (slides.length === 0) return;
    
    let activeIdx = 0;
    
    setInterval(() => {
        slides[activeIdx].classList.remove("active");
        activeIdx = (activeIdx + 1) % slides.length;
        slides[activeIdx].classList.add("active");
    }, 4500);
}

// Search and Filter Hub
function searchFood() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;
    
    currentSearchQuery = searchInput.value.toLowerCase().trim();
    applyFilters();
}

function filterCategory(category, buttonElement) {
    currentCategory = category.toLowerCase();
    
    // Update active tab styling
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => btn.classList.remove("active"));
    if (buttonElement) {
        buttonElement.classList.add("active");
    }
    
    applyFilters();
}

function applyFilters() {
    const cards = document.querySelectorAll(".grid-recipes .card");
    if (cards.length === 0) return;
    
    cards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        const description = card.querySelector(".card-desc").innerText.toLowerCase();
        const cardCategory = card.getAttribute("data-category") || '';
        
        const matchesCategory = (currentCategory === 'all' || cardCategory.toLowerCase() === currentCategory);
        const matchesSearch = (title.includes(currentSearchQuery) || description.includes(currentSearchQuery));
        
        if (matchesCategory && matchesSearch) {
            card.style.display = "flex";
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
        } else {
            card.style.display = "none";
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
        }
    });
}

// Premium dynamic Toast notifications
function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>✨</span> ${message}`;
    
    container.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        toast.style.transition = "all 0.5s ease";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3500);
}

// Contact form simulation
function handleContactSubmit(event) {
    event.preventDefault();
    const name = event.target.querySelector("input[type='text']").value;
    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    event.target.reset();
}

// Recipe checkbox behavior
function initRecipeCheckboxes() {
    const listItems = document.querySelectorAll(".ingredient-item");
    listItems.forEach((item, index) => {
        const checkbox = item.querySelector("input[type='checkbox']");
        const span = item.querySelector("span");
        if (!checkbox || !span) return;
        
        // Dynamic change listener
        checkbox.addEventListener("change", () => {
            // Checkbox state handled by CSS checkmark and sibling selector,
            // but we can add minor subtle haptic-like effect or local storage persistence if needed
            if (checkbox.checked) {
                span.style.color = "var(--text-muted)";
            } else {
                span.style.color = "var(--text-primary)";
            }
        });
    });
}