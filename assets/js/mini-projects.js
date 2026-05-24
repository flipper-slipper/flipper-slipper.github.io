// ─────────────────────────────────────────────
//  Mini Projects
//  To add a project: append an object to the
//  miniProjects array below. That's it.
// ─────────────────────────────────────────────

const miniProjects = [
    {
        title: "Outlook Event Parser",
        logo: "projects/outlook_extension/logo.png",
        video: "projects/outlook_extension/outlook-event-perser-demo.mp4",
        descriptionFile: "projects/outlook_extension/description.txt",
    },
];

// ─── Rendering ───────────────────────────────

function createMiniProjectCard(project, index) {
    return `
        <article class="mini-card-has-video mini-tile" data-mini-index="${index}">
            <div class="mini-tile-inner">
                <span class="image">
                    <img src="${project.logo}" alt="${project.title}" />
                </span>
                <div class="text-content">
                    <h2>${project.title}</h2>
                </div>
            </div>
        </article>`;
}

function renderMiniProjects() {
    const grid = document.getElementById('mini-projects-grid');
    if (!grid) return;
    grid.innerHTML = miniProjects.map(createMiniProjectCard).join('');
}

// ─── Modal ───────────────────────────────────

const MODAL_HTML = `
    <div id="mini-modal" class="mini-modal-overlay" aria-hidden="true">
        <div class="mini-modal-panel">
            <button class="mini-modal-close" aria-label="Close">&#x2715;</button>
            <div class="mini-modal-left">
                <video id="mini-modal-video" autoplay muted loop playsinline></video>
            </div>
            <div class="mini-modal-right">
                <h2 id="mini-modal-title"></h2>
                <p id="mini-modal-desc"></p>
            </div>
        </div>
    </div>`;

function injectModal() {
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
}

function initModal() {
    const overlay  = document.getElementById('mini-modal');
    const video    = document.getElementById('mini-modal-video');
    const titleEl  = document.getElementById('mini-modal-title');
    const descEl   = document.getElementById('mini-modal-desc');
    const closeBtn = overlay.querySelector('.mini-modal-close');

    async function openModal(index) {
        const project = miniProjects[index];
        if (!project) return;

        titleEl.textContent = project.title;
        descEl.textContent  = '';
        video.src           = project.video;

        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        video.play().catch(function () {});

        if (!project._desc) {
            project._desc = await fetch(project.descriptionFile)
                .then(function (r) { return r.text(); })
                .catch(function () { return ''; });
        }
        descEl.textContent = project._desc;
    }

    function closeModal() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        video.pause();
        video.src = '';
    }

    document.getElementById('mini-projects-grid').addEventListener('click', function (e) {
        const card = e.target.closest('.mini-card-has-video');
        if (card) openModal(Number(card.dataset.miniIndex));
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
}

// ─── Init ────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    renderMiniProjects();
    injectModal();
    initModal();
});
