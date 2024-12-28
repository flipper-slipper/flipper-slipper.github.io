const projects = [
    {
        title: "Hopper",
        thumbnail: "projects/Hopper/hopper_pic01.png",
        page: "../../projects/Hopper/hopper.html",
        description: "Biomechanical hopping machine",
    },
    {
        title: "Hopper",
        thumbnail: "projects/Hopper/hopper_pic01.png",
        page: "../../projects/Hopper/hopper.html",
        description: "Biomechanical hopping machine",
    },
    {
        title: "Hopper",
        thumbnail: "projects/Hopper/hopper_pic01.png",
        page: "../../projects/Hopper/hopper.html",
        description: "Biomechanical hopping machine",
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

function renderProjects() {
    const container = document.getElementById('projects-grid');
    container.innerHTML = projects.map(project => createProject(project)).join('');
}

document.addEventListener('DOMContentLoaded', renderProjects);