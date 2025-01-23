document.addEventListener('DOMContentLoaded', function() {
    // Get parameters from URL
    const params = new URLSearchParams(window.location.search);
    const age = params.get('age');
    const chapter = params.get('chapter');
    const name = params.get('name');

    // Update certificate fields
    if (age) document.getElementById('student-age').textContent = age;
    if (chapter) document.getElementById('chapter-number').textContent = chapter;
    if (name) document.getElementById('student-name').textContent = name;
});

async function downloadCertificate() {
    try {
        // Use html2canvas to capture the certificate
        const canvas = await html2canvas(document.getElementById('certificate-container'));
        
        // Convert to image and download
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'fluffbutt-certificate.png';
        link.href = image;
        link.click();
    } catch (error) {
        console.error('Error generating certificate:', error);
        alert('Sorry, there was an error generating your certificate!');
    }
} 