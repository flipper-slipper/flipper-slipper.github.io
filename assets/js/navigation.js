// Shared Navigation Component
// This eliminates duplicate HTML across project pages

const PROJECT_DATA = {
    'revimo': {
        title: 'ReviMo @ Mass Robotics',
        subtitle: 'Summer 2025, Robotics Engineering Intern',
        skills: ['Design for Manufacturing', 'CNC Machining', 'Fusion CAM']
    },
    'boxing_robot': {
        title: 'Boxing Robot',
        subtitle: 'Spring 2025, Fundamentals of Robotics Project',
        skills: ['Computer Vision', 'ARUCO Detection', 'Inverse Kinematics', 'Python']
    },
    'techroast': {
        title: 'Techroast',
        subtitle: 'Summer 2025, Creative Hacking Project',
        skills: ['Meta Ray-Ban Glasses', 'Livestreaming', 'Custom Apparel', 'Creative Hacking']
    },
    'evolv': {
        title: 'Evolv Technology',
        subtitle: 'Summer 2024, Software Engineering Intern',
        skills: ['Python', 'Flask API', 'CI/CD Pipeline']
    },
    'frisbee': {
        title: 'Assistive Frisbee Launcher',
        subtitle: 'Spring 2024, Mechanical Design Project',
        skills: ['OnShape', 'Arduino', 'Mechanical Design']
    },
    'hopper': {
        title: 'Mechanical Hopper',
        subtitle: 'Fall 2024, First Year Engineering Project',
        skills: ['Rapid Prototyping', 'Mechanical Design', 'Spring Systems']
    },
    'frc190': {
        title: 'FRC Team 190',
        subtitle: '2022-2023, Robotics Team Member',
        skills: ['RobotC', 'Mechanical Design', 'Team Leadership']
    },
    'plane': {
        title: 'RC Plane Design',
        subtitle: 'Fall 2020, Aerospace Engineering Project',
        skills: ['CAD Design', 'Aerodynamics', 'Flight Testing']
    },
    'ros_fsm': {
        title: 'ROS2 RoboBehaviors + Finite State Machine',
        subtitle: 'Fall 2025, Computational Robotics Project',
        skills: ['ROS2', 'Python', 'Finite State Machines']
    },
    'siso': {
        title: 'Digital Sign In/Out System',
        subtitle: '2022-2024, Software Engineering Project',
        skills: ['Flutter', 'Firebase', 'Mobile Development']
    },
    'steam_engine': {
        title: 'Steam Engine Model',
        subtitle: 'Spring 2020, Thermodynamics Project',
        skills: ['Thermodynamics', 'Mechanical Design', '3D Printing']
    },
    'umass': {
        title: 'UMass Memorial Navigation App',
        subtitle: 'Spring 2025, Mobile App Development',
        skills: ['Flutter', 'Firestore', 'Mobile Development']
    }
};

function createNavigationBreadcrumb(projectName) {
    return `
        <!-- Navigation Breadcrumb -->
        <div class="nav-breadcrumb">
            <div>
                <a href="/" class="nav-button">david</a> / ${projectName}
            </div>
        </div>
    `;
}

function createProjectHeader(projectName) {
    const data = PROJECT_DATA[projectName];
    if (!data) return '';

    const skillsHTML = data.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');

    return `
        <div class="project-header">
            <h1>${data.title}</h1>
            <p class="project-subtitle">${data.subtitle}</p>
            <div class="skills-container">
                ${skillsHTML}
            </div>
            <hr class="project-divider">
        </div>
    `;
}

// Auto-inject navigation and header on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only inject if we're on a project page
    if (window.location.pathname.includes('/projects/')) {
        const projectName = getProjectNameFromPath();
        if (projectName) {
            // Inject navigation breadcrumb
            if (!document.querySelector('.nav-breadcrumb')) {
                const navigation = createNavigationBreadcrumb(projectName);
                const main = document.querySelector('#main');
                if (main) {
                    main.insertAdjacentHTML('beforebegin', navigation);
                }
            }
            
            // Inject project header
            if (PROJECT_DATA && PROJECT_DATA[projectName]) {
                const header = createProjectHeader(projectName);
                const mainInner = document.querySelector('#main .inner');
                if (mainInner) {
                    // Ensure consistent container styling
                    mainInner.style.maxWidth = '1000px';
                    mainInner.style.margin = '0 auto';
                    
                    // Remove old header elements
                    const oldH1 = mainInner.querySelector('h1');
                    const oldSubtitle = mainInner.querySelector('p');
                    const oldSkills = mainInner.querySelector('.skills-container, [style*="display: flex"]');
                    const oldDivider = mainInner.querySelector('hr');
                    
                    if (oldH1) oldH1.remove();
                    if (oldSubtitle) oldSubtitle.remove();
                    if (oldSkills) oldSkills.remove();
                    if (oldDivider) oldDivider.remove();
                    
                    // Insert new header
                    mainInner.insertAdjacentHTML('afterbegin', header);
                }
            }
        }
    }
});

function getProjectNameFromPath() {
    const path = window.location.pathname;
    const projectMatch = path.match(/\/projects\/([^\/]+)\//);
    if (projectMatch) {
        const folderName = projectMatch[1];
        // Convert folder name to display name
        const displayNames = {
            'revimo': 'revimo',
            'boxing_robot': 'boxing_robot',
            'techroast': 'techroast',
            'evolv': 'evolv', 
            'frisbee': 'frisbee',
            'hopper': 'hopper',
            'frc190': 'frc190',
            'plane': 'plane',
            'ros_fsm': 'ros_fsm',
            'siso': 'siso',
            'steam_engine': 'steam_engine',
            'umass': 'umass'
        };
        return displayNames[folderName] || folderName.toLowerCase();
    }
    return null;
}
