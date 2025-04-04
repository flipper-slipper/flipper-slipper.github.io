const projects = [
    {
        title: "Hopper",
        thumbnail: "projects/Hopper/hopper_pic01.png",
        page: "../../projects/Hopper/hopper.html",
        description: "Biomechanical hopping machine",
    },
    {
        title: "Frisbee Launcher",
        thumbnail: "projects/Frisbee/pic01.jpg",
        page: "../../projects/Frisbee/frisbee.html",
        description: "Assistive frisbee launcher",
    },
    {
        title: "Mams SISO",
        thumbnail: "projects/SISO/pic03.png",
        page: "../../projects/SISO/siso.html",
        description: "Digital Sign In/Out System",
    },

    {
        title: "Evolv Technology",
        thumbnail: "projects/evolv/pic01.png",
        page: "../../projects/evolv/evolv.html",
        description: "Summer 2024 Internship",
    },
    {
        title: "UMass Health Navigation App",
        thumbnail: "projects/umass/pic01.png",
        page: "../../projects/umass/umass.html",
        description: "Mobile App development for UMass Health",
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