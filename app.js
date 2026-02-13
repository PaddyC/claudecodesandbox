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

    // Hide the start-here tip if the roster already has data
    if (roster.length > 0) {
        const startHereTip = document.getElementById('startHereTip');
        if (startHereTip) {
            startHereTip.classList.add('hidden');
        }
    }
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

    // Hide the "start here" tip when the user focuses on the name field
    const startHereTip = document.getElementById('startHereTip');
    if (startHereTip) {
        fullNameInput.addEventListener('focus', () => {
            startHereTip.classList.add('hidden');
        }, { once: true });
    }
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

// Confluence Wiki Markup Export
// ==============================

function exportToConfluence() {
    const btn = document.getElementById('exportConfluenceBtn');

    if (roster.length === 0) {
        alert('No roster data to export. Please add team members first.');
        return;
    }

    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(() => {
        try {
            generateConfluenceMarkup();
        } catch (error) {
            console.error('Confluence export error:', error);
            alert('Error generating Confluence markup. Please try again.');
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 100);
}

function generateConfluenceMarkup() {
    const teams = getTeamsData();
    const roles = getRolesData();
    const teamNames = Object.keys(teams).sort();
    const roleNames = Object.keys(roles).sort((a, b) => roles[b].count - roles[a].count);
    const totalMembers = roster.length;
    const totalTeams = teamNames.length;
    const totalRoles = roleNames.length;

    const reportDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let markup = '';

    // Title
    markup += 'h1. Program Roster Report\n\n';
    markup += `{info:title=Report Date}${reportDate}{info}\n\n`;

    // Executive Summary
    markup += 'h2. Executive Summary\n\n';
    markup += '||Metric||Value||\n';
    markup += `|Total Teams|${totalTeams}|\n`;
    markup += `|Total Members|${totalMembers}|\n`;
    markup += `|Unique Roles|${totalRoles}|\n`;
    markup += `|Average Team Size|${(totalMembers / totalTeams).toFixed(1)}|\n\n`;

    // Role Distribution
    markup += 'h2. Role Distribution\n\n';
    markup += '||Role||Count||% of Total||Teams||\n';

    roleNames.forEach(roleName => {
        const role = roles[roleName];
        const percentage = ((role.count / totalMembers) * 100).toFixed(1);
        const teamList = role.teams.join(', ');
        markup += `|${roleName}|${role.count}|${percentage}%|${teamList}|\n`;
    });

    markup += '\n';

    // Status macro for visual bar chart
    markup += '{panel:title=Role Distribution Chart|borderStyle=solid|borderColor=#667eea}\n';
    roleNames.forEach(roleName => {
        const role = roles[roleName];
        const barLength = Math.round((role.count / Math.max(...roleNames.map(r => roles[r].count))) * 20);
        const bar = '\u2588'.repeat(barLength);
        markup += `* *${roleName}* ${bar} (${role.count})\n`;
    });
    markup += '{panel}\n\n';

    // Team Breakdown
    markup += 'h2. Team Breakdown\n\n';

    teamNames.forEach(teamName => {
        const team = teams[teamName];
        const roleEntries = Object.entries(team.roles).sort((a, b) => b[1] - a[1]);

        markup += `h3. ${teamName} (${team.members.length} member${team.members.length !== 1 ? 's' : ''})\n\n`;

        markup += '||Role||Count||\n';
        roleEntries.forEach(([role, count]) => {
            markup += `|${role}|${count}|\n`;
        });

        markup += '\n';
    });

    // Detailed Team Roster
    markup += 'h2. Detailed Team Roster\n\n';

    teamNames.forEach(teamName => {
        const team = teams[teamName];
        const sortedMembers = team.members.sort((a, b) => a.fullName.localeCompare(b.fullName));

        markup += `h3. ${teamName}\n\n`;
        markup += '||Name||Role||\n';

        sortedMembers.forEach(member => {
            markup += `|${member.fullName}|${member.role}|\n`;
        });

        markup += '\n';
    });

    // Footer
    markup += '----\n';
    markup += `_Generated on ${reportDate} | Confidential - For Internal Use Only_\n`;

    // Download the file
    const blob = new Blob([markup], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roster-report-${new Date().toISOString().split('T')[0]}.confluence.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// PDF Export Functionality
// ========================

// Color palette for PDF (RGB format for jsPDF)
const pdfColors = {
    primary: [102, 126, 234],      // #667eea
    primaryDark: [118, 75, 162],   // #764ba2
    secondary: [240, 147, 251],    // #f093fb
    success: [17, 153, 142],       // #11998e
    successLight: [56, 239, 125],  // #38ef7d
    text: [26, 26, 46],            // #1a1a2e
    textSecondary: [74, 74, 104],  // #4a4a68
    textMuted: [139, 139, 167],    // #8b8ba7
    white: [255, 255, 255],
    lightGray: [245, 247, 250],
    border: [226, 232, 240]
};

// Role colors for PDF charts (RGB)
const pdfRoleColors = [
    [102, 126, 234], [240, 147, 251], [79, 172, 254], [67, 233, 123],
    [250, 112, 154], [168, 237, 234], [255, 154, 158], [255, 236, 210],
    [102, 126, 234], [17, 153, 142], [252, 92, 125], [0, 198, 251]
];

function exportToPDF() {
    const btn = document.getElementById('exportPdfBtn');

    // Check if there's data to export
    if (roster.length === 0) {
        alert('No roster data to export. Please add team members first.');
        return;
    }

    // Show loading state
    btn.classList.add('loading');
    btn.disabled = true;

    // Use setTimeout to allow UI to update
    setTimeout(() => {
        try {
            generatePDF();
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 100);
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    let currentY = 0;
    let pageNumber = 1;

    // Get data
    const teams = getTeamsData();
    const roles = getRolesData();
    const teamNames = Object.keys(teams).sort();
    const roleNames = Object.keys(roles).sort((a, b) => roles[b].count - roles[a].count);
    const totalMembers = roster.length;
    const totalTeams = teamNames.length;
    const totalRoles = roleNames.length;

    // Helper function to add new page if needed
    function checkNewPage(requiredSpace) {
        if (currentY + requiredSpace > pageHeight - 30) {
            addFooter();
            doc.addPage();
            pageNumber++;
            currentY = margin;
            return true;
        }
        return false;
    }

    // Helper function to add footer
    function addFooter() {
        doc.setFontSize(9);
        doc.setTextColor(...pdfColors.textMuted);
        doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        doc.text('Confidential - For Internal Use Only', margin, pageHeight - 10);
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(dateStr, pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    // Helper function to draw rounded rectangle
    function drawRoundedRect(x, y, w, h, r, fillColor, strokeColor = null) {
        doc.setFillColor(...fillColor);
        if (strokeColor) {
            doc.setDrawColor(...strokeColor);
            doc.setLineWidth(0.3);
        }
        doc.roundedRect(x, y, w, h, r, r, strokeColor ? 'FD' : 'F');
    }

    // ==========================================
    // HEADER SECTION
    // ==========================================

    // Draw gradient header background
    drawRoundedRect(margin, margin, contentWidth, 50, 4, pdfColors.primary);

    // Add subtle overlay gradient effect (darker at bottom)
    doc.setFillColor(118, 75, 162, 0.3);
    drawRoundedRect(margin, margin + 25, contentWidth, 25, 0, [100, 100, 180]);

    // Header text
    doc.setTextColor(...pdfColors.white);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('Program Roster Report', margin + 15, margin + 22);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Team Composition & Role Distribution Analysis', margin + 15, margin + 35);

    // Report date
    const reportDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(10);
    doc.text(reportDate, margin + 15, margin + 45);

    currentY = margin + 65;

    // ==========================================
    // EXECUTIVE SUMMARY SECTION
    // ==========================================

    doc.setTextColor(...pdfColors.text);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', margin, currentY);

    currentY += 12;

    // Draw stat boxes
    const statBoxWidth = (contentWidth - 20) / 3;
    const statBoxHeight = 35;

    // Teams stat box
    drawRoundedRect(margin, currentY, statBoxWidth, statBoxHeight, 3, pdfColors.lightGray, pdfColors.border);
    doc.setFillColor(...pdfColors.primary);
    doc.roundedRect(margin, currentY, 4, statBoxHeight, 0, 0, 'F');

    doc.setTextColor(...pdfColors.primary);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(totalTeams.toString(), margin + 15, currentY + 16);
    doc.setTextColor(...pdfColors.textSecondary);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Total Teams', margin + 15, currentY + 26);

    // Members stat box
    const membersX = margin + statBoxWidth + 10;
    drawRoundedRect(membersX, currentY, statBoxWidth, statBoxHeight, 3, pdfColors.lightGray, pdfColors.border);
    doc.setFillColor(...pdfColors.success);
    doc.roundedRect(membersX, currentY, 4, statBoxHeight, 0, 0, 'F');

    doc.setTextColor(...pdfColors.success);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(totalMembers.toString(), membersX + 15, currentY + 16);
    doc.setTextColor(...pdfColors.textSecondary);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Team Members', membersX + 15, currentY + 26);

    // Roles stat box
    const rolesX = margin + (statBoxWidth + 10) * 2;
    drawRoundedRect(rolesX, currentY, statBoxWidth, statBoxHeight, 3, pdfColors.lightGray, pdfColors.border);
    doc.setFillColor(...pdfColors.secondary);
    doc.roundedRect(rolesX, currentY, 4, statBoxHeight, 0, 0, 'F');

    doc.setTextColor(240, 147, 251);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(totalRoles.toString(), rolesX + 15, currentY + 16);
    doc.setTextColor(...pdfColors.textSecondary);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Unique Roles', rolesX + 15, currentY + 26);

    currentY += statBoxHeight + 20;

    // ==========================================
    // ROLE DISTRIBUTION SECTION
    // ==========================================

    checkNewPage(80);

    doc.setTextColor(...pdfColors.text);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Role Distribution', margin, currentY);

    currentY += 12;

    // Draw role distribution cards
    const roleCardWidth = (contentWidth - 10) / 2;
    const roleCardHeight = 25;

    roleNames.forEach((roleName, index) => {
        const role = roles[roleName];
        const percentage = ((role.count / totalMembers) * 100).toFixed(1);
        const colorIndex = index % pdfRoleColors.length;
        const roleColor = pdfRoleColors[colorIndex];

        // Check if we need a new page
        if (checkNewPage(roleCardHeight + 5)) {
            doc.setTextColor(...pdfColors.text);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Role Distribution (continued)', margin, currentY);
            currentY += 12;
        }

        const cardX = margin + (index % 2) * (roleCardWidth + 10);
        const cardY = currentY + Math.floor(index / 2) * (roleCardHeight + 8);

        // Card background
        drawRoundedRect(cardX, cardY, roleCardWidth, roleCardHeight, 3, pdfColors.white, pdfColors.border);

        // Color accent bar
        doc.setFillColor(...roleColor);
        doc.roundedRect(cardX, cardY, 4, roleCardHeight, 2, 0, 'F');

        // Role name
        doc.setTextColor(...pdfColors.text);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(roleName, cardX + 10, cardY + 9);

        // Count and percentage
        doc.setTextColor(...roleColor);
        doc.setFontSize(14);
        doc.text(role.count.toString(), cardX + roleCardWidth - 35, cardY + 10);

        doc.setTextColor(...pdfColors.textMuted);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`${percentage}%`, cardX + roleCardWidth - 15, cardY + 10);

        // Progress bar
        const barWidth = roleCardWidth - 20;
        const barHeight = 4;
        const barX = cardX + 10;
        const barY = cardY + 16;
        const fillWidth = (role.count / Math.max(...roleNames.map(r => roles[r].count))) * barWidth;

        // Bar background
        doc.setFillColor(230, 235, 240);
        doc.roundedRect(barX, barY, barWidth, barHeight, 1, 1, 'F');

        // Bar fill
        doc.setFillColor(...roleColor);
        doc.roundedRect(barX, barY, fillWidth, barHeight, 1, 1, 'F');

        // Teams count
        doc.setTextColor(...pdfColors.textMuted);
        doc.setFontSize(8);
        doc.text(`${role.teams.length} team${role.teams.length !== 1 ? 's' : ''}`, cardX + 10, cardY + 23);
    });

    // Calculate space used by role cards
    const roleRows = Math.ceil(roleNames.length / 2);
    currentY += roleRows * (roleCardHeight + 8) + 15;

    // ==========================================
    // TEAM BREAKDOWN SECTION
    // ==========================================

    checkNewPage(60);

    doc.setTextColor(...pdfColors.text);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Team Breakdown', margin, currentY);

    currentY += 12;

    // Team cards
    teamNames.forEach((teamName, teamIndex) => {
        const team = teams[teamName];
        const roleEntries = Object.entries(team.roles).sort((a, b) => b[1] - a[1]);
        const cardHeight = 30 + (roleEntries.length * 8);

        if (checkNewPage(cardHeight + 10)) {
            doc.setTextColor(...pdfColors.text);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Team Breakdown (continued)', margin, currentY);
            currentY += 12;
        }

        // Card background
        drawRoundedRect(margin, currentY, contentWidth, cardHeight, 4, pdfColors.white, pdfColors.border);

        // Team header bar
        doc.setFillColor(...pdfColors.primary);
        doc.roundedRect(margin, currentY, contentWidth, 10, 4, 0, 'F');
        doc.setFillColor(...pdfColors.primary);
        doc.rect(margin, currentY + 5, contentWidth, 5, 'F');

        // Team name
        doc.setTextColor(...pdfColors.white);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(teamName, margin + 8, currentY + 7);

        // Member count badge
        doc.setFillColor(255, 255, 255, 0.2);
        const badgeText = `${team.members.length} member${team.members.length !== 1 ? 's' : ''}`;
        const badgeWidth = doc.getTextWidth(badgeText) + 10;
        doc.roundedRect(pageWidth - margin - badgeWidth - 5, currentY + 2.5, badgeWidth, 6, 1, 1, 'F');
        doc.setFontSize(8);
        doc.text(badgeText, pageWidth - margin - badgeWidth, currentY + 6.5);

        // Role breakdown
        let roleY = currentY + 18;

        roleEntries.forEach(([role, count], idx) => {
            const colorIndex = roleNames.indexOf(role) % pdfRoleColors.length;
            const roleColor = pdfRoleColors[colorIndex >= 0 ? colorIndex : 0];

            // Role color dot
            doc.setFillColor(...roleColor);
            doc.circle(margin + 12, roleY - 1, 2, 'F');

            // Role name
            doc.setTextColor(...pdfColors.textSecondary);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(role, margin + 18, roleY);

            // Count
            doc.setTextColor(...pdfColors.text);
            doc.setFont('helvetica', 'bold');
            doc.text(count.toString(), margin + contentWidth - 20, roleY);

            roleY += 8;
        });

        currentY += cardHeight + 10;
    });

    // ==========================================
    // DETAILED ROSTER SECTION
    // ==========================================

    checkNewPage(40);

    doc.setTextColor(...pdfColors.text);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Team Roster', margin, currentY);

    currentY += 12;

    teamNames.forEach((teamName, teamIndex) => {
        const team = teams[teamName];
        const sortedMembers = team.members.sort((a, b) => a.fullName.localeCompare(b.fullName));

        // Calculate required height
        const tableHeaderHeight = 10;
        const rowHeight = 8;
        const tableHeight = tableHeaderHeight + (sortedMembers.length * rowHeight) + 15;

        if (checkNewPage(tableHeight + 20)) {
            doc.setTextColor(...pdfColors.text);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Detailed Team Roster (continued)', margin, currentY);
            currentY += 12;
        }

        // Team section header
        doc.setFillColor(...pdfColors.primary);
        doc.roundedRect(margin, currentY, contentWidth, 8, 2, 2, 'F');
        doc.setTextColor(...pdfColors.white);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${teamName} (${team.members.length})`, margin + 5, currentY + 5.5);

        currentY += 12;

        // Table header
        doc.setFillColor(...pdfColors.lightGray);
        doc.rect(margin, currentY, contentWidth, 7, 'F');

        doc.setTextColor(...pdfColors.textSecondary);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('NAME', margin + 5, currentY + 5);
        doc.text('ROLE', margin + 85, currentY + 5);

        currentY += 8;

        // Table rows
        sortedMembers.forEach((member, idx) => {
            // Alternate row background
            if (idx % 2 === 0) {
                doc.setFillColor(252, 252, 253);
                doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
            }

            // Border line
            doc.setDrawColor(...pdfColors.border);
            doc.setLineWidth(0.1);
            doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

            const colorIndex = roleNames.indexOf(member.role) % pdfRoleColors.length;
            const roleColor = pdfRoleColors[colorIndex >= 0 ? colorIndex : 0];

            // Name
            doc.setTextColor(...pdfColors.text);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(member.fullName, margin + 5, currentY + 5.5);

            // Role with color indicator
            doc.setFillColor(...roleColor);
            doc.circle(margin + 85, currentY + 4, 1.5, 'F');
            doc.setTextColor(...pdfColors.textSecondary);
            doc.text(member.role, margin + 90, currentY + 5.5);

            currentY += rowHeight;
        });

        currentY += 15;
    });

    // Add final footer
    addFooter();

    // Save the PDF
    const filename = `roster-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
}
