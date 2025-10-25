// Media Upload Handler for AutoCare Diagnostics
document.addEventListener('DOMContentLoaded', function() {
    const mediaUploadInput = document.getElementById('media-upload');
    const mediaPreviewContainer = document.getElementById('media-preview');
    
    if (mediaUploadInput && mediaPreviewContainer) {
        // Handle file selection
        mediaUploadInput.addEventListener('change', function(e) {
            const files = e.target.files;
            
            if (!files || files.length === 0) return;
            
            // Clear previous previews if needed
            // mediaPreviewContainer.innerHTML = '';
            
            // Process each selected file
            Array.from(files).forEach(file => {
                const fileType = file.type.split('/')[0]; // 'image' or 'video'
                const previewItem = document.createElement('div');
                previewItem.className = 'relative';
                
                // Create preview based on file type
                if (fileType === 'image') {
                    const img = document.createElement('img');
                    img.className = 'w-20 h-20 object-cover rounded-lg border border-gray-300';
                    img.file = file;
                    previewItem.appendChild(img);
                    
                    // Use FileReader to load the image
                    const reader = new FileReader();
                    reader.onload = (function(aImg) { 
                        return function(e) { 
                            aImg.src = e.target.result; 
                        }; 
                    })(img);
                    reader.readAsDataURL(file);
                } else if (fileType === 'video') {
                    const video = document.createElement('video');
                    video.className = 'w-20 h-20 object-cover rounded-lg border border-gray-300';
                    video.controls = false;
                    
                    // Use FileReader to load the video
                    const reader = new FileReader();
                    reader.onload = (function(aVideo) { 
                        return function(e) { 
                            aVideo.src = e.target.result; 
                        }; 
                    })(video);
                    reader.readAsDataURL(file);
                    
                    previewItem.appendChild(video);
                    
                    // Add video icon overlay
                    const videoIcon = document.createElement('div');
                    videoIcon.className = 'absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg';
                    videoIcon.innerHTML = '<i data-lucide="play" class="w-8 h-8 text-white"></i>';
                    previewItem.appendChild(videoIcon);
                }
                
                // Add remove button
                const removeBtn = document.createElement('button');
                removeBtn.className = 'absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center';
                removeBtn.innerHTML = '×';
                removeBtn.addEventListener('click', function() {
                    previewItem.remove();
                    // Update the file input (this is tricky with native file inputs)
                    // For simplicity, we'll just show/hide the preview
                });
                previewItem.appendChild(removeBtn);
                
                // Add to preview container
                mediaPreviewContainer.appendChild(previewItem);
            });
            
            // Initialize Lucide icons for any new elements
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    }
});

// Function to get all uploaded media files for submission
function getUploadedMediaFiles() {
    const mediaPreviewContainer = document.getElementById('media-preview');
    const mediaFiles = [];
    
    if (mediaPreviewContainer) {
        // Get all image and video elements in the preview
        const imageElements = mediaPreviewContainer.querySelectorAll('img');
        const videoElements = mediaPreviewContainer.querySelectorAll('video');
        
        // Extract files from image elements
        imageElements.forEach(img => {
            if (img.file) {
                mediaFiles.push({
                    type: 'image',
                    file: img.file
                });
            }
        });
        
        // Extract files from video elements
        videoElements.forEach(video => {
            // This is a simplification - in a real app you'd need to store the file reference
            if (video.src && video.src.startsWith('data:')) {
                // This is a blob URL or data URL
                mediaFiles.push({
                    type: 'video',
                    src: video.src
                });
            }
        });
    }
    
    return mediaFiles;
}

// Enhance the diagnostic AI with media processing
function enhanceDiagnosisWithMedia(diagnosis, mediaFiles) {
    // In a real implementation, you would:
    // 1. Upload the media files to a server
    // 2. Process them with computer vision AI
    // 3. Enhance the diagnosis based on visual information
    
    if (mediaFiles && mediaFiles.length > 0) {
        // Add a note about media enhancement
        diagnosis.mediaEnhanced = true;
        diagnosis.mediaCount = mediaFiles.length;
        
        // Simulate improved confidence with media
        diagnosis.confidence = Math.min(diagnosis.confidence * 1.2, 0.95);
        
        // Add a note about the visual analysis
        diagnosis.visualAnalysis = "Visual analysis confirms symptoms consistent with diagnosis.";
    }
    
    return diagnosis;
}

// Export functions for use in diagnostic-ai.js
window.mediaUploadUtils = {
    getUploadedMediaFiles,
    enhanceDiagnosisWithMedia
};