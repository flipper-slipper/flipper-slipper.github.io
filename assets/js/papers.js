// First, define your data
const papers = [
    {
        title: "Dandelion Populations",
        url: "papers/himcm2023.pdf",
        description: "Math modeling paper written for 2023 HiMCM challenge",
        tags: ["USA Outstanding Winner (1st/967)", "NCTM Award"],
        hasProductionIcon: false,
        thumbnail: "papers/dandelion.png"
    },
    {
        title: "Land Use Analysis",
        url: "papers/immc2023.pdf",
        description: "Math modeling paper written for 2023 IMMC challenge",
        tags: ["Intl. Meritorious (Top 6)"],
        hasProductionIcon: false,
        thumbnail: "papers/landuse.png"
    },
    {
        title: "Honeybee Populations",
        url: "/papers/himcm2022.pdf",
        description: "Math modeling paper written for 2022 HiMCM challenge",
        tags: ["USA Finalist (Top 6%)"],
        hasProductionIcon: false,
        thumbnail: "papers/honeybee.png"
    },
    {
        title: "E-Bike Demand",
        url: "/papers/mathworks2023.pdf",
        description: "Math modeling paper written for 2022 M3 Modeling challenge",
        tags: ["2nd Round Selection"],
        hasProductionIcon: false,
        thumbnail: "papers/ebike.png"
    },
    {
        title: "Forest Fires",
        url: "/papers/modsim_project3.pdf",
        description: "Math modeling paper written for ModSim class",
        tags: [],
        hasProductionIcon: false,
        thumbnail: "papers/forrestfires.png"
    },
];


function createCard(paper) {
    const ribbonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="award-icon"><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"/><path d="M12 14c-3.859 0-7-3.141-7-7S8.141 0 12 0s7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"/><path d="M8.5 13L6 24l6-3 6 3-2.5-11h-2.1l1.3 5.7L12 18l-2.7 1.7L10.6 13z"/></svg>`;
    
    const awardsHtml = paper.tags.length > 0 
        ? `<div class="paper-awards">${paper.tags.map(tag => `<span class="paper-award-badge">${ribbonIcon}${tag}</span>`).join('')}</div>`
        : '';

    return `
        <article class="paper-tile">
            <a href="${paper.url}" target="_blank" rel="noopener noreferrer">
                <div class="paper-image-area">
                    <span class="image">
                        <img src="${paper.thumbnail}" alt="${paper.title}" />
                    </span>
                    ${awardsHtml}
                </div>
                <div class="text-content">
                    <h2>${paper.title}</h2>
                    <div class="content">
                        <p>${paper.description}</p>
                    </div>
                </div>
            </a>
        </article>
    `;
}

// Finally, your render function and event listener
function renderPapers() {
    const container = document.getElementById('papers-grid');
    container.className = 'papers-grid'; // Use papers-grid only, not tiles
    container.innerHTML = papers.map(paper => createCard(paper)).join('');
}

document.addEventListener('DOMContentLoaded', renderPapers);