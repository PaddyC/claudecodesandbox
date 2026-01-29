// Roster Management Application - Enhanced Version

// Data store - persists to localStorage
let roster = [];

// Role color palette for visual distinction
const roleColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
    'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)'
];

// Role icon mapping
const roleIcons = {
    'developer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>',
    'designer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    'manager': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'lead': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>',
    'analyst': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    'engineer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    'default': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
};

// DOM Elements
const addPersonForm = document.getElementById('addPersonForm');
const fullNameInput = document.getElementById('fullName');
const teamNameInput = document.getElementById('teamName');
const roleInput = document.getElementById('role');
const teamSuggestions = document.getElementById('teamSuggestions');
const roleSuggestions = document.getElementById('roleSuggestions');
const programSummary = document.getElementById('programSummary');
const teamRosters = document.getElementById('teamRosters');
const roleSummary = document.getElementById('roleSummary');
const roleBadge = document.getElementById('roleBadge');
const statTeams = document.getElementById('statTeams');
const statMembers = document.getElementById('statMembers');
const statRoles = document.getElementById('statRoles');
const particlesContainer = document.getElementById('particles');

// Role color cache
const roleColorMap = new Map();

// Initialize application
function init() {
    loadFromStorage();
    renderAll();
    setupEventListeners();
    createParticles();
}

// Create floating particles
function createParticles() {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 10 + 5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Load data from localStorage
function loadFromStorage() {
    const stored = localStorage.getItem('rosterData');
    if (stored) {
        roster = JSON.parse(stored);
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem('rosterData', JSON.stringify(roster));
}

// Setup event listeners
function setupEventListeners() {
    addPersonForm.addEventListener('submit', handleAddPerson);
}

// Handle adding a new person
function handleAddPerson(e) {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const teamName = teamNameInput.value.trim();
    const role = roleInput.value.trim();

    if (!fullName || !teamName || !role) {
        alert('Please fill in all fields');
        return;
    }

    const person = {
        id: generateId(),
        fullName,
        teamName,
        role,
        addedAt: new Date().toISOString()
    };

    roster.push(person);
    saveToStorage();
    renderAll();

    // Reset form
    addPersonForm.reset();
    fullNameInput.focus();
}

// Remove a person from the roster
function removePerson(id) {
    roster = roster.filter(person => person.id !== id);
    saveToStorage();
    renderAll();
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get color for a role (consistent color per role)
function getRoleColor(role) {
    if (!roleColorMap.has(role)) {
        const colorIndex = roleColorMap.size % roleColors.length;
        roleColorMap.set(role, roleColors[colorIndex]);
    }
    return roleColorMap.get(role);
}

// Get icon for a role
function getRoleIcon(role) {
    const normalizedRole = role.toLowerCase();
    for (const [key, icon] of Object.entries(roleIcons)) {
        if (normalizedRole.includes(key)) {
            return icon;
        }
    }
    return roleIcons.default;
}

// Get initials from name
function getInitials(name) {
    return name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}

// Get teams data organized by team name
function getTeamsData() {
    const teams = {};

    roster.forEach(person => {
        if (!teams[person.teamName]) {
            teams[person.teamName] = {
                name: person.teamName,
                members: [],
                roles: {}
            };
        }
        teams[person.teamName].members.push(person);

        // Count roles
        if (!teams[person.teamName].roles[person.role]) {
            teams[person.teamName].roles[person.role] = 0;
        }
        teams[person.teamName].roles[person.role]++;
    });

    return teams;
}

// Get roles data organized by role name
function getRolesData() {
    const roles = {};

    roster.forEach(person => {
        if (!roles[person.role]) {
            roles[person.role] = {
                name: person.role,
                count: 0,
                teams: new Set(),
                members: []
            };
        }
        roles[person.role].count++;
        roles[person.role].teams.add(person.teamName);
        roles[person.role].members.push(person);
    });

    // Convert Sets to Arrays for easier handling
    Object.values(roles).forEach(role => {
        role.teams = Array.from(role.teams);
    });

    return roles;
}

// Animate number counter
function animateNumber(element, target, duration = 500) {
    const start = parseInt(element.textContent) || 0;
    const change = target - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(start + change * eased);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Render all views
function renderAll() {
    renderHeaderStats();
    renderRoleSummary();
    renderProgramSummary();
    renderTeamRosters();
    updateSuggestions();
}

// Render header statistics
function renderHeaderStats() {
    const teams = getTeamsData();
    const roles = getRolesData();
    const totalTeams = Object.keys(teams).length;
    const totalMembers = roster.length;
    const totalRoles = Object.keys(roles).length;

    animateNumber(statTeams, totalTeams);
    animateNumber(statMembers, totalMembers);
    animateNumber(statRoles, totalRoles);
}

// Render role summary section
function renderRoleSummary() {
    const roles = getRolesData();
    const roleNames = Object.keys(roles).sort((a, b) => roles[b].count - roles[a].count);

    if (roleNames.length === 0) {
        roleSummary.innerHTML = `
            <p class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                No roles found. Add team members to see role distribution.
            </p>
        `;
        roleBadge.textContent = '0 Unique Roles';
        return;
    }

    const maxCount = Math.max(...roleNames.map(name => roles[name].count));
    roleBadge.textContent = `${roleNames.length} Unique Role${roleNames.length !== 1 ? 's' : ''}`;

    let html = '';

    roleNames.forEach((roleName, index) => {
        const role = roles[roleName];
        const percentage = (role.count / roster.length) * 100;
        const barWidth = (role.count / maxCount) * 100;
        const color = getRoleColor(roleName);
        const icon = getRoleIcon(roleName);

        html += `
            <div class="role-card" style="--role-color: ${color}; animation-delay: ${index * 0.05}s;">
                <div class="role-card-header">
                    <div class="role-name">
                        <div class="role-icon-badge" style="background: ${color};">
                            ${icon}
                        </div>
                        ${escapeHtml(roleName)}
                    </div>
                    <div class="role-count">${role.count}</div>
                </div>
                <div class="role-progress-container">
                    <div class="role-progress-bar">
                        <div class="role-progress-fill" style="width: ${barWidth}%; background: ${color};"></div>
                    </div>
                    <div class="role-progress-label">
                        <span>${percentage.toFixed(1)}% of total</span>
                        <span>${role.teams.length} team${role.teams.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div class="role-teams">
                    ${role.teams.map(team => `<span class="role-team-chip">${escapeHtml(team)}</span>`).join('')}
                </div>
            </div>
        `;
    });

    roleSummary.innerHTML = html;
}

// Render program summary
function renderProgramSummary() {
    const teams = getTeamsData();
    const teamNames = Object.keys(teams).sort();

    if (teamNames.length === 0) {
        programSummary.innerHTML = `
            <p class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                No teams added yet. Add team members above to see the program roster.
            </p>
        `;
        return;
    }

    const totalMembers = roster.length;
    const totalTeams = teamNames.length;

    let html = `
        <div class="team-summary-card overview">
            <h3>Program Overview <span class="member-count">${totalTeams} Team${totalTeams !== 1 ? 's' : ''}</span></h3>
            <div class="roles-list">
                <div class="role-item">
                    <span>Total Team Members</span>
                    <strong>${totalMembers}</strong>
                </div>
                <div class="role-item">
                    <span>Average Team Size</span>
                    <strong>${(totalMembers / totalTeams).toFixed(1)}</strong>
                </div>
                <div class="role-item">
                    <span>Unique Roles</span>
                    <strong>${Object.keys(getRolesData()).length}</strong>
                </div>
            </div>
        </div>
    `;

    teamNames.forEach((teamName, index) => {
        const team = teams[teamName];
        const roleEntries = Object.entries(team.roles).sort((a, b) => b[1] - a[1]);

        html += `
            <div class="team-summary-card" style="animation-delay: ${(index + 1) * 0.05}s;">
                <h3>${escapeHtml(teamName)} <span class="member-count">${team.members.length} member${team.members.length !== 1 ? 's' : ''}</span></h3>
                <div class="roles-list">
                    ${roleEntries.map(([role, count]) => `
                        <div class="role-item">
                            <span style="display: flex; align-items: center; gap: 8px;">
                                <span class="member-role-dot" style="background: ${getRoleColor(role)};"></span>
                                ${escapeHtml(role)}
                            </span>
                            <strong>${count}</strong>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    programSummary.innerHTML = html;
}

// Render team rosters
function renderTeamRosters() {
    const teams = getTeamsData();
    const teamNames = Object.keys(teams).sort();

    if (teamNames.length === 0) {
        teamRosters.innerHTML = `
            <p class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                No team members added yet.
            </p>
        `;
        return;
    }

    let html = '';

    teamNames.forEach(teamName => {
        const team = teams[teamName];
        const sortedMembers = team.members.sort((a, b) => a.fullName.localeCompare(b.fullName));

        html += `
            <div class="team-roster">
                <div class="team-roster-header">
                    <h3>${escapeHtml(teamName)}</h3>
                    <span class="badge">${team.members.length} member${team.members.length !== 1 ? 's' : ''}</span>
                </div>
                <ul class="team-members">
                    ${sortedMembers.map(member => {
                        const roleColor = getRoleColor(member.role);
                        return `
                            <li class="team-member">
                                <div class="member-info">
                                    <div class="member-avatar" style="background: ${roleColor};">
                                        ${getInitials(member.fullName)}
                                    </div>
                                    <div class="member-details">
                                        <span class="member-name">${escapeHtml(member.fullName)}</span>
                                        <span class="member-role">
                                            <span class="member-role-dot" style="background: ${roleColor};"></span>
                                            ${escapeHtml(member.role)}
                                        </span>
                                    </div>
                                </div>
                                <button class="btn btn-danger" onclick="removePerson('${member.id}')">Remove</button>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        `;
    });

    teamRosters.innerHTML = html;
}

// Update suggestions for autocomplete
function updateSuggestions() {
    const teams = getTeamsData();
    const roles = getRolesData();
    const teamNames = Object.keys(teams).sort();
    const roleNames = Object.keys(roles).sort();

    teamSuggestions.innerHTML = teamNames
        .map(name => `<option value="${escapeHtml(name)}">`)
        .join('');

    roleSuggestions.innerHTML = roleNames
        .map(name => `<option value="${escapeHtml(name)}">`)
        .join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
