// --- Data Structures (Arrays & Objects) for Twin Cities Animal Rescue ---
const rescuePrograms = [
    { id: 'foster', name: 'Foster Care Program', description: 'Provide a temporary loving home for animals awaiting adoption.' },
    { id: 'volunteer', name: 'Shelter Volunteer', description: 'Help with event coordination, animal socialization, and care.' },
    { id: 'adoption', name: 'Adoption Services', description: 'Find your lifelong companion through our careful matching process.' }
];

// --- 1. Interactive Feature: Program Interest Tracker ---
function handleProgramSelection(event) {
    event.preventDefault();
    const selectElement = document.getElementById('program-choice');
    const selectedId = selectElement.value;
    const outputDiv = document.getElementById('program-info');

    if (!selectedId) {
        outputDiv.innerHTML = "<p style='color: #6B3E26;'>Please select a program option to view details.</p>";
        return;
    }

    // Find the selected program object from our array
    const program = rescuePrograms.find(p => p.id === selectedId);

    if (program) {
        // Update page dynamically
        outputDiv.innerHTML = `
            <strong>Selected Focus: ${program.name}</strong>
            <p>${program.description}</p>
        `;

        // Use localStorage to save user preference
        localStorage.setItem('preferredProgram', selectedId);
    }
}

// Load saved preference on page load using browser storage
function loadSavedPreference() {
    const savedProgram = localStorage.getItem('preferredProgram');
    if (savedProgram) {
        const selectElement = document.getElementById('program-choice');
        if (selectElement) {
            selectElement.value = savedProgram;
            // Trigger display update automatically
            handleProgramSelection({ preventDefault: () => {} });
        }
    }
}

// --- 2. JavaScript Form Validation ---
function validateInquiryForm(event) {
    event.preventDefault(); // Prevent submission by default

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const interestSelect = document.getElementById('interest');
    
    // Error display elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const interestError = document.getElementById('interest-error');

    let isValid = true;

    // Reset previous error messages
    nameError.textContent = '';
    emailError.textContent = '';
    if(interestError) interestError.textContent = '';

    // Required Field Check for Name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Full Name is required.';
        nameError.style.color = 'red';
        isValid = false;
    }

    // Email Format Validation Check
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
        emailError.textContent = 'Email address is required.';
        emailError.style.color = 'red';
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email format (e.g., name@example.com).';
        emailError.style.color = 'red';
        isValid = false;
    }

    // Required Field Check for interest
    if (!interestSelect.value) {
        interestError.textContent = 'Please select an interest type.';
        interestError.style.color = 'red';
        isValid = false;
    }

    // If valid, show success message
    if (isValid) {
        alert('Thank you! Your inquiry has been successfully validated and recorded.');
        // Optionally submit or reset form here
        document.getElementById('inquiry-form').reset();
    }
}

// Attach event listeners when DOM content loads
document.addEventListener('DOMContentLoaded', () => {
    // Check for interactive selector widget on home/services page
    const formWidget = document.getElementById('program-form');
    if (formWidget) {
        formWidget.addEventListener('submit', handleProgramSelection);
        loadSavedPreference();
    }

    // Check for contact form validation on contact page
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', validateInquiryForm);
    }
});