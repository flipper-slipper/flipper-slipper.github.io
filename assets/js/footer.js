// Centralized Footer Management
// Update the footer content here and it will propagate to all pages

const footerContent = `
	<div class="inner">
		<p class="footer-text">&copy; 2025 David Barsoum, <a href="mailto:dbarsoum@olin.edu">dbarsoum@olin.edu</a></p>
	</div>
`;

// Function to inject footer into pages
function injectFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = footerContent;
        setupFooterBehavior();
    }
}

// Function to setup footer behavior
function setupFooterBehavior() {
    // Simple footer behavior - no complex logic needed
    return;
}

// Inject footer when DOM is loaded
document.addEventListener('DOMContentLoaded', injectFooter);

// Also inject if the script loads after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
} else {
    injectFooter();
}
