document.addEventListener('DOMContentLoaded', function() {
    // Get parameters from URL
    const params = new URLSearchParams(window.location.search);
    const name = decodeURIComponent(params.get('name') || '');
    const age = decodeURIComponent(params.get('age') || '');
    const chapter = params.get('chapter') || '';

    // Update certificate fields with new format
    document.querySelector('#certificate-name .student-value').textContent = name;
    document.querySelector('#certificate-age .student-value').textContent = `Age: ${age}`;
    document.querySelector('#certificate-chapter .student-value').textContent = `Chapter: ${chapter}`;
}); 