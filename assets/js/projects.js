const projects = [
    {
        title: "ReviMo @ Mass Robotics",
        thumbnail: "projects/revimo/pic01.png",
        page: "/projects/revimo/",
        description: "Summer 2025 Internship",
        type: "internship",
    },
    {
        title: "Boxing Robot",
        thumbnail: "projects/boxing_robot/pic01.png",
        page: "/projects/boxing_robot/",
        description: "Spring 2025, Vision-guided task-space planning on 5-DOF manipulator",
        type: "project",
    },
    {
        title: "Techroast",
        thumbnail: "projects/techroast/pic01.png",
        page: "/projects/techroast/",
        description: "Summer 2025, Custom shirts and livestreaming with Meta Ray-Ban glasses",
        type: "project",
    },
    {
        title: "ROS2 FSM Robot",
        thumbnail: "projects/ros_fsm/pic01.png",
        page: "/projects/ros_fsm/",
        description: "Fall 2025, Finite State Machine controlling wall follow, teleop, and avoidance",
        type: "project",
    },
    {
        title: "Mini Wind Tunnel",
        thumbnail: "projects/wind_tunnel/pic01.png",
        page: "/projects/wind_tunnel/",
        description: "Spring 2025, Compact wind tunnel for aerodynamic testing",
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
        description: "Spring 2024, Assistive frisbee launcher",
        type: "project",
    },
    {
        title: "Hopper",
        thumbnail: "projects/hopper/hopper_pic01.png",
        page: "/projects/hopper/",
        description: "Fall 2024, Biomechanical hopping machine",
        type: "project",
    },
    {
        title: "Mams SISO",
        thumbnail: "projects/siso/thumbnail.png",
        page: "/projects/siso/",
        description: "2022-2024, Digital Sign In/Out System",
        type: "project",
    },
    {
        title: "UMass Health Navigation App",
        thumbnail: "projects/umass/pic01.png",
        page: "/projects/umass/",
        description: "Spring 2025, Mobile App development for UMass Health",
        type: "project",
    },
    {
        title: "RC Airplane & Joystick",
        thumbnail: "projects/plane/pic01.png",
        page: "/projects/plane/",
        description: "Fall 2020, Guillow's Cessna 170 RC Conversion",
        type: "project",
    },
    {
        title: "Steam Engine Restoration",
        thumbnail: "projects/steam_engine/pic01.png",
        page: "/projects/steam_engine/",
        description: "Spring 2020, Meccano Steam Engine Restoration",
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