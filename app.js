// Roster Management Application

// Data store - persists to localStorage
let roster = [];

// DOM Elements
const addPersonForm = document.getElementById('addPersonForm');
const fullNameInput = document.getElementById('fullName');
const teamNameInput = document.getElementById('teamName');
const roleInput = document.getElementById('role');
const teamSuggestions = document.getElementById('teamSuggestions');
const programSummary = document.getElementById('programSummary');
const teamRosters = document.getElementById('teamRosters');

// Initialize application
function init() {
    loadFromStorage();
    renderAll();
    setupEventListeners();
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

// Render all views
function renderAll() {
    renderProgramSummary();
    renderTeamRosters();
    updateTeamSuggestions();
}

// Render program summary
function renderProgramSummary() {
    const teams = getTeamsData();
    const teamNames = Object.keys(teams).sort();

    if (teamNames.length === 0) {
        programSummary.innerHTML = '<p class="empty-state">No teams added yet. Add team members above to see the program roster.</p>';
        return;
    }

    const totalMembers = roster.length;
    const totalTeams = teamNames.length;

    let html = `
        <div class="team-summary-card" style="border-left-color: #28a745;">
            <h3>Program Overview <span class="member-count" style="background: #28a745;">${totalTeams} Teams</span></h3>
            <div class="roles-list">
                <div class="role-item">
                    <span>Total Team Members</span>
                    <strong>${totalMembers}</strong>
                </div>
                <div class="role-item">
                    <span>Average Team Size</span>
                    <strong>${(totalMembers / totalTeams).toFixed(1)}</strong>
                </div>
            </div>
        </div>
    `;

    teamNames.forEach(teamName => {
        const team = teams[teamName];
        const roleEntries = Object.entries(team.roles).sort((a, b) => b[1] - a[1]);

        html += `
            <div class="team-summary-card">
                <h3>${escapeHtml(teamName)} <span class="member-count">${team.members.length} members</span></h3>
                <div class="roles-list">
                    ${roleEntries.map(([role, count]) => `
                        <div class="role-item">
                            <span>${escapeHtml(role)}</span>
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
        teamRosters.innerHTML = '<p class="empty-state">No team members added yet.</p>';
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
                    ${sortedMembers.map(member => `
                        <li class="team-member">
                            <div class="member-info">
                                <span class="member-name">${escapeHtml(member.fullName)}</span>
                                <span class="member-role">${escapeHtml(member.role)}</span>
                            </div>
                            <button class="btn btn-danger" onclick="removePerson('${member.id}')">Remove</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    teamRosters.innerHTML = html;
}

// Update team name suggestions for autocomplete
function updateTeamSuggestions() {
    const teams = getTeamsData();
    const teamNames = Object.keys(teams).sort();

    teamSuggestions.innerHTML = teamNames
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
