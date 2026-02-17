/**
 * CV Loader - Florent ALBANY
 * Handles dynamic content injection from content.json
 */

async function loadCV() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        
        const isFullVersion = document.body.classList.contains('full-version');
        
        // 1. Basic Info
        hydrateBasicInfo(data.contact);
        
        // 2. About Section
        hydrateAbout(data.about, isFullVersion);
        
        // 3. Skills
        hydrateSkills(data.skills, isFullVersion);
        
        // 4. Experiences
        hydrateExperiences(data.experiences, isFullVersion);
        
        // 5. Formation
        hydrateFormation(data.formation, isFullVersion);
        
        // 6. Publications
        hydratePublications(data.publications);

    } catch (error) {
        console.error('Error loading CV data:', error);
    }
}

function hydrateBasicInfo(contact) {
    setText('profile-name', contact.name);
    setText('profile-title', contact.title);
    
    // Contact Links
    const setLink = (id, value, hrefPrefix = '', iconClass = '') => {
        const link = document.querySelector(`[data-id="${id}"]`);
        if (link) {
            link.href = hrefPrefix + value;
            link.innerHTML = `<i class="${iconClass}"></i> ${value}`;
        }
    };

    setLink('contact-email', contact.email, 'mailto:', 'fas fa-envelope');
    setLink('contact-phone', contact.phone, 'tel:', 'fas fa-phone');
    setLink('contact-location', contact.location, contact.location_url, 'fas fa-location-dot');
    setLink('contact-linkedin', contact.linkedin, 'https://www.' + contact.linkedin, 'fab fa-linkedin');
    setLink('contact-github', contact.github, 'https://www.' + contact.github, 'fab fa-github');
}

function hydrateAbout(about, isFull) {
    const container = document.getElementById('about-text');
    if (!container) return;

    if (isFull) {
        container.innerHTML = about.full.map(p => `<p>${p}</p>`).join('<p style="margin-top: 1rem;"></p>');
    } else {
        container.innerHTML = `<p>${about.short}</p>`;
    }
}

function hydrateSkills(skills, isFull) {
    hydrateSkillList('skills-techniques', skills.techniques, isFull ? 0 : 6);
    hydrateSkillList('skills-programmation', skills.programmation, isFull ? 0 : 3);
    hydrateSkillList('skills-cao', skills.cao_simulation, isFull ? 0 : 3);
}

function hydrateSkillList(id, list, limit = 0) {
    const container = document.getElementById(id);
    if (container) {
        const displayedList = limit > 0 ? list.slice(0, limit) : list;
        container.innerHTML = displayedList.map(s => `<li>${s}</li>`).join('');
    }
}

function hydrateExperiences(experiences, isFull) {
    const container = document.getElementById('experience-list');
    if (!container) return;

    container.innerHTML = experiences.map(exp => {
        // Check if there's only one role to decide layout
        const isSingleRole = exp.roles.length === 1;

        if (isSingleRole) {
            const role = exp.roles[0];
            return `
            <div class="job single-role">
                <div class="job-header-inline">
                    <div class="company-role-group">
                        <a href="${exp.url}" target="_blank" rel="noopener noreferrer" class="company-link" data-tooltip="${exp.description}">
                            <img src="${exp.logo}" alt="${exp.company}">
                            <strong>${exp.company}</strong>
                        </a>
                        <span class="separator">|</span>
                        <span class="role-title ${!isFull && role.tooltip ? 'tooltip' : ''}" data-tooltip="${role.tooltip || ''}">${role.title}</span>
                    </div>
                    <span class="date">${role.date}</span>
                </div>
                <ul>
                    ${(isFull && role.full_points ? role.full_points : (isFull ? role.bullet_points : (role.bullet_points_a4 || role.bullet_points))).map(bp => `
                        <li class="${!isFull && role.tooltip ? 'tooltip' : ''}" data-tooltip="${role.tooltip || ''}">${bp}</li>
                    `).join('')}
                </ul>
            </div>`;
        } else {
            return `
            <div class="job">
                <div class="job-company">
                    <a href="${exp.url}" target="_blank" rel="noopener noreferrer" class="company-link" data-tooltip="${exp.description}">
                        <img src="${exp.logo}" alt="${exp.company}">
                        <strong>${exp.company}</strong>
                    </a>
                </div>
                ${exp.roles.map((role, idx) => `
                    <div class="job-header" style="${idx > 0 ? 'margin-top: 1rem;' : ''}">
                        <h4 class="${!isFull && role.tooltip ? 'tooltip' : ''}" data-tooltip="${role.tooltip || ''}">
                            ${role.title} <span class="date">${role.date}</span>
                        </h4>
                    </div>
                    ${!isFull && role.short_context ? `<div class="experience-context">${role.short_context}</div>` : ''}
                    ${isFull && role.context ? `<div class="experience-context">${role.context}</div>` : ''}
                    <ul>
                        ${(isFull && role.full_points ? role.full_points : (isFull ? role.bullet_points : (role.bullet_points_a4 || role.bullet_points))).map(bp => `
                            <li class="${!isFull && role.tooltip ? 'tooltip' : ''}" data-tooltip="${role.tooltip || ''}">${bp}</li>
                        `).join('')}
                    </ul>
                `).join('')}
            </div>`;
        }
    }).join('');
}

function hydrateFormation(formation, isFull) {
    const container = document.getElementById('formation-list');
    if (!container) return;

    container.innerHTML = formation.map(item => `
        <div class="education-item ${!isFull ? 'compact' : ''}">
            <div class="job-header">
                <h4><i class="${item.icon}"></i> ${item.title} <span class="date">${item.date}</span></h4>
            </div>
            <p>${item.institution}</p>
        </div>
    `).join('');
}

function hydratePublications(publications) {
    const container = document.getElementById('publications-list');
    if (!container) return;

    container.innerHTML = publications.map(pub => `
        <li>
            ${pub.url ? 
                `<a href="${pub.url}" target="_blank" class="publication-link tooltip" data-tooltip="${pub.tooltip || ''}"><i class="${pub.icon}"></i> ${pub.title}</a>` : 
                `<span class="publication-link tooltip" data-tooltip="${pub.tooltip || ''}"><i class="${pub.icon}"></i> ${pub.title}</span>`
            }
        </li>
    `).join('');
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadCV();
    initDarkMode();
});

function initDarkMode() {
    const isFull = document.body.classList.contains('full-version');
    if (isFull) return; // Full version is dark by default

    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (!toggleBtn) return;

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icon
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    });
}
