const projects = [
    {
        title: "Revimo",
        thumbnail: "projects/Revimo/pic01.png",
        page: "../../projects/Revimo/revimo.html",
        description: "2025 Summer Internship",
        type: "internship",
    },
    {
        title: "ROS2 FSM Robot",
        thumbnail: "projects/ros_fsm/pic01.png",
        page: "https://github.com/flipper-slipper/comprobo-project1-robobehaviors-FSM",
        description: "Finite State Machine controlling wall follow, teleop, and avoidance",
        type: "project",
    },
    {
        title: "Mini Wind Tunnel",
        thumbnail: "projects/wind_tunnel/pic01.png",
        page: "../../projects/wind_tunnel/wind_tunnel.html",
        description: "Compact wind tunnel for aerodynamic testing",
        type: "project",
    },
    {
        title: "Evolv Technology",
        thumbnail: "projects/evolv/pic01.png",
        page: "../../projects/evolv/evolv.html",
        description: "Summer 2024 Internship",
        type: "internship",
    },
    {
        title: "Frisbee Launcher",
        thumbnail: "projects/Frisbee/pic01.png",
        page: "../../projects/Frisbee/frisbee.html",
        description: "Assistive frisbee launcher",
        type: "project",
    },
    {
        title: "Hopper",
        thumbnail: "projects/Hopper/hopper_pic01.png",
        page: "../../projects/Hopper/hopper.html",
        description: "Biomechanical hopping machine",
        type: "project",
    },
    {
        title: "Mams SISO",
        thumbnail: "projects/SISO/thumbnail.png",
        page: "../../projects/SISO/siso.html",
        description: "Digital Sign In/Out System",
        type: "project",
    },
    {
        title: "UMass Health Navigation App",
        thumbnail: "projects/umass/pic01.png",
        page: "../../projects/umass/umass.html",
        description: "Mobile App development for UMass Health",
        type: "project",
    },
    {
        title: "RC Airplane & Joystick",
        thumbnail: "projects/plane/pic01.png",
        page: "../../projects/plane/plane.html",
        description: "Guillow's Cessna 170 RC Conversion",
        type: "project",
    },
    {
        title: "Steam Engine Restoration",
        thumbnail: "projects/steam_engine/pic01.png",
        page: "../../projects/steam_engine/steam_engine.html",
        description: "Meccano Steam Engine Restoration",
        type: "project",
    },
];


function createProject(project) {
    const isExternal = /^https?:\/\//.test(project.page);
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `
        <article class="style1">
            <span class="image">
                <img src="${project.thumbnail}"
                    alt="${project.description}" />
            </span>
            <a href="${project.page}"${targetAttr}>
                <h2>${project.title}</h2>
                <div class="content">
                    <p>${project.description}</p>
                </div>
            </a>
        </article>
                    `;
}

function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-grid');
    const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);
    container.innerHTML = filtered.map(project => createProject(project)).join('');
}

function setupProjectFilters() {
    const filterContainer = document.getElementById('projects-filter');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', function(e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        // Update active state
        [...filterContainer.querySelectorAll('.filter-btn')].forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.getAttribute('data-filter');
        renderProjects(filter);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupProjectFilters();
    renderProjects('all');
});