// First, define your data
const papers = [
    {
        title: "Dandelion Populations",
        url: "papers/himcm2023.pdf",
        description: "Math modeling paper written for 2023 HiMCM challenge",
        tags: ["USA Outstanding Winner (1st/967)", "NCTM Award"],
        hasProductionIcon: false
    },
    {
        title: "Land Use Analysis",
        url: "papers/immc2023.pdf",
        description: "Math modeling paper written for 2023 IMMC challenge",
        tags: ["Intl. Meritorious (Top 6)"],
        hasProductionIcon: false
    },
    {
        title: "Honeybee Populations",
        url: "/papers/himcm2022.pdf",
        description: "Math modeling paper written for 2022 HiMCM challenge",
        tags: ["USA Finalist (Top 6%)"],
        hasProductionIcon: false
    },
    {
        title: "E-Bike Demand",
        url: "/papers/mathworks2023.pdf",
        description: "Math modeling paper written for 2022 M3 Modeling challenge",
        tags: ["2nd Round Selection"],
        hasProductionIcon: false
    },
    {
        title: "Forest Fires",
        url: "/papers/modsim_project3.pdf",
        description: "Math modeling paper written for ModSim class",
        tags: [],
        hasProductionIcon: false
    },
];


function createCard(paper) {
    const productionIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="production-icon" viewBox="0 0 16 16">
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>`;

    return `
        <div class="project-card">
            <div class="card-header">
                <div class="card-header-content">
                    <div class="card-title-wrapper">
                        <h3 class="card-title">
                            <a href="${paper.url}" target="_blank">
                                ${paper.title}
                                <span class="status-indicator"></span>
                            </a>
                            ${paper.hasProductionIcon ? productionIcon : ''}
                        </h3>
                    </div>
                    <p class="card-description">${paper.description}</p>
                </div>
            </div>
            <div class="card-content">
                <div class="tags-wrapper">
                    ${paper.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Finally, your render function and event listener
function renderPapers() {
    const container = document.getElementById('papers-grid');
    container.innerHTML = papers.map(paper => createCard(paper)).join('');
}

document.addEventListener('DOMContentLoaded', renderPapers);