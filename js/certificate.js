document.addEventListener('DOMContentLoaded', function() {
    // Get parameters from URL
    const params = new URLSearchParams(window.location.search);
    const name = decodeURIComponent(params.get('name') || '');
    const age = decodeURIComponent(params.get('age') || '').replace(/[^0-9]/g, ''); // Only keep numbers
    const chapter = params.get('chapter') || '';

    // Update certificate fields
    if (name) document.getElementById('student-name').textContent = name;
    if (age) document.getElementById('student-age').textContent = age;
    if (chapter) document.getElementById('chapter-number').textContent = chapter;
});

async function downloadCertificate() {
    try {
        // Hide the download button and show loading state
        const downloadBtn = document.querySelector('.certificate-download-btn');
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = 'Generating...';
        downloadBtn.disabled = true;
        downloadBtn.style.opacity = '0.7';

        // Use html2canvas to capture the certificate
        const canvas = await html2canvas(document.getElementById('certificate-container'), {
            scale: 2, // Higher quality
            backgroundColor: null,
            logging: false, // Disable console logs
            useCORS: true // Handle cross-origin images
        });
        
        // Convert to image and download
        const image = canvas.toDataURL('image/png', 1.0); // Max quality
        const link = document.createElement('a');
        link.download = `certificate-${document.getElementById('student-name').textContent.trim()}.png`;
        link.href = image;
        link.click();

        // Restore button state
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
        downloadBtn.style.opacity = '1';
        
    } catch (error) {
        console.error('Error generating certificate:', error);
        alert('Sorry, there was an error generating your certificate! Please try again.');
        
        // Restore button on error
        const downloadBtn = document.querySelector('.certificate-download-btn');
        downloadBtn.textContent = 'Download Certificate';
        downloadBtn.disabled = false;
        downloadBtn.style.opacity = '1';
    }
} 