const projects = [
    {
        title: "Hopper",
        thumbnail: "projects/Hopper/hopper_pic01.png",
        page: "../../projects/Hopper/hopper.html",
        description: "Biomechanical hopping machine",
        category: "project"
    },
    {
        title: "Frisbee Launcher",
        thumbnail: "projects/Frisbee/pic01.jpg",
        page: "../../projects/Frisbee/frisbee.html",
        description: "Assistive frisbee launcher",
        category: "project"
    },
    {
        title: "Mams SISO",
        thumbnail: "projects/SISO/pic03.png",
        page: "../../projects/SISO/siso.html",
        description: "Digital Sign In/Out System",
        category: "project"
    },

    {
        title: "Evolv Technology",
        thumbnail: "projects/evolv/pic01.png",
        page: "../../projects/evolv/evolv.html",
        description: "Summer 2024 Internship",
        category: "internship"
    },
    {
        title: "UMass Health Navigation App",
        thumbnail: "projects/umass/pic01.png",
        page: "../../projects/umass/umass.html",
        description: "Mobile App development for UMass Health",
        category: "project"
    },
    {
        title: "RC Airplane & Joystick",
        thumbnail: "projects/plane/pic01.png",
        page: "../../projects/plane/plane.html",
        description: "Guillow's Cessna 170 RC Conversion",
        category: "project"
    },
    {
        title: "Steam Engine Restoration",
        thumbnail: "projects/steam_engine/pic01.png",
        page: "../../projects/steam_engine/steam_engine.html",
        description: "Meccano Steam Engine Restoration",
        category: "project"
    },
];


function createProject(project) {
    return `
        <article class="style1">
            <span class="image">
                <img src="${project.thumbnail}"
                    alt="${project.description}" />
            </span>
            <a href="${project.page}">
                <h2>${project.title}</h2>
                <div class="content">
                    <p>${project.description}</p>
                </div>
            </a>
        </article>
                    `;
}


// Import papers if available
let papers = [];
try {
    papers = window.papers || [];
} catch (e) {}

function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-grid');
    let items = [...projects];
    // Add papers as project cards for filtering
    if (typeof papers !== 'undefined' && papers.length > 0) {
        items = items.concat(papers.map(paper => ({
            title: paper.title,
            thumbnail: '', // Optionally add a thumbnail for papers
            page: paper.url,
            description: paper.description,
            category: paper.category
        })));
    }
    if (filter !== 'all') {
        items = items.filter(item => item.category === filter);
    }
    container.innerHTML = items.map(createProject).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    // Filter button event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
});