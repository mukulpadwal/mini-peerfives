// Helper function to generate unique IDs

function generateId() {
    return Math.random().toString(36).substring(2, 10);
}

module.exports = generateId;