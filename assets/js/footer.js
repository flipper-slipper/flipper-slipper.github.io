// Centralized Footer Management
// Update the footer content here and it will propagate to all pages

const footerContent = `
	<div class="inner">
		<hr class="footer-line">
		<p class="footer-text">&copy; 2025 David Barsoum</p>
	</div>
`;

// Function to inject footer into pages
function injectFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = footerContent;
    }
}

// Inject footer when DOM is loaded
document.addEventListener('DOMContentLoaded', injectFooter);

// Also inject if the script loads after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
} else {
    injectFooter();
}
