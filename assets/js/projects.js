const projects = [
    {
        title: "Scribblz",
        thumbnail: "projects/scribblz/scribblz-thumbnail.png",
        page: "/projects/scribblz/",
        description: "Window climbing art robot",
        type: "project",
    },
    {
        title: "ReviMo @ Mass Robotics",
        thumbnail: "projects/revimo/pic01.png",
        page: "/projects/revimo/",
        description: "Summer 2025 Internship",
        type: "internship",
    },
    {
        title: "C++ Particle Filter",
        thumbnail: "projects/particle_filter/particle_thumbnail-01.png",
        page: "/projects/particle_filter/",
        description: "Robotics Localization Algorithm",
        type: "project",
    },
    {
        title: "Techroast",
        thumbnail: "projects/techroast/pic01.png",
        page: "/projects/techroast/",
        description: "Hacking a comedy show",
        type: "project",
    },
    {
        title: "ROS2 FSM Robot",
        thumbnail: "projects/ros_fsm/pic01.png",
        page: "/projects/ros_fsm/",
        description: "FSM robot with wall follow and avoidance",
        type: "project",
    },
    {
        title: "Boxing Robot",
        thumbnail: "projects/boxing_robot/pic01.png",
        page: "/projects/boxing_robot/",
        description: "Vision-guided 5-DOF manipulator",
        type: "project",
    },
    {
        title: "Mini Wind Tunnel",
        thumbnail: "projects/wind_tunnel/pic01.png",
        page: "/projects/wind_tunnel/",
        description: "Visualizing Airflow",
        type: "project",
    },
    {
        title: "Evolv Technology",
        thumbnail: "projects/evolv/pic01.png",
        page: "/projects/evolv/",
        description: "Summer 2024 Internship",
        type: "internship",
    },
    {
        title: "Frisbee Launcher",
        thumbnail: "projects/frisbee/pic01.png",
        page: "/projects/frisbee/",
        description: "Assistive frisbee launcher",
        type: "project",
    },
    {
        title: "Hopper",
        thumbnail: "projects/hopper/hopper_pic01.png",
        page: "/projects/hopper/",
        description: "Biomechanical hopping machine",
        type: "project",
    },
    {
        title: "Mams SISO",
        thumbnail: "projects/siso/thumbnail.png",
        page: "/projects/siso/",
        description: "Digital Sign In/Out System",
        type: "project",
    },
    {
        title: "UMass Health Navigation App",
        thumbnail: "projects/umass/pic01.png",
        page: "/projects/umass/",
        description: "App development for UMass Health",
        type: "project",
    },
    {
        title: "RC Airplane & Joystick",
        thumbnail: "projects/plane/pic01.png",
        page: "/projects/plane/",
        description: "Guillow's Cessna 170 RC Conversion",
        type: "project",
    },
    {
        title: "Steam Engine Restoration",
        thumbnail: "projects/steam_engine/pic01.png",
        page: "/projects/steam_engine/",
        description: "Meccano Steam Engine Restoration",
        type: "project",
    },
];


function createProject(project) {
    const isExternal = /^https?:\/\//.test(project.page);
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `
        <article class="style1">
            <a href="${project.page}"${targetAttr}>
                <span class="image">
                    <img src="${project.thumbnail}"
                        alt="${project.description}" />
                </span>
                <div class="text-content">
                    <h2>${project.title}</h2>
                    <div class="content">
                        <p>${project.description}</p>
                    </div>
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