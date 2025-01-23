async function downloadCertificate() {
    const downloadBtn = document.querySelector('.certificate-download-btn');
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Generating...';

    try {
        // Only capture the certificate div, not the buttons
        const certificateElement = document.querySelector('.certificate');
        
        const canvas = await html2canvas(certificateElement, {
            scale: 2, // Higher quality
            useCORS: true, // Allow loading cross-origin images
            allowTaint: true,
            backgroundColor: null
        });

        // Create download link
        const link = document.createElement('a');
        link.download = 'my-certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Reset button
        downloadBtn.textContent = 'Download Certificate';
        downloadBtn.disabled = false;

    } catch (error) {
        console.error('Error generating certificate:', error);
        alert('Sorry, there was an error generating your certificate! Please try again.');
        
        // Reset button on error
        downloadBtn.textContent = 'Download Certificate';
        downloadBtn.disabled = false;
    }
}

// Initialize certificate when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get parameters from URL
    const params = new URLSearchParams(window.location.search);
    const name = decodeURIComponent(params.get('name') || '');
    const age = decodeURIComponent(params.get('age') || '');
    const chapter = params.get('chapter') || '';

    // Update certificate fields
    document.querySelector('#certificate-name .student-value').textContent = name;
    document.querySelector('#certificate-age .student-value').textContent = age;
    document.querySelector('#certificate-chapter .student-value').textContent = chapter;
}); 