// Export Diagnostic Results Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add export button to diagnostic results section
    addExportButton();
});

// Add export button to diagnostic results section
function addExportButton() {
    const diagnosticResultsSection = document.getElementById('diagnostic-results');
    if (!diagnosticResultsSection) return;
    
    // Create export button container
    const exportContainer = document.createElement('div');
    exportContainer.className = 'mt-4 flex flex-wrap gap-2';
    exportContainer.innerHTML = `
        <button id="export-pdf" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
            <i data-lucide="file-type-pdf" class="w-5 h-5 mr-2"></i>
            Export as PDF
        </button>
        <button id="export-csv" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
            <i data-lucide="file-spreadsheet" class="w-5 h-5 mr-2"></i>
            Export as CSV
        </button>
        <button id="export-print" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <i data-lucide="printer" class="w-5 h-5 mr-2"></i>
            Print Results
        </button>
    `;
    
    // Add export container to diagnostic results section
    diagnosticResultsSection.appendChild(exportContainer);
    
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Add event listeners to export buttons
    document.getElementById('export-pdf').addEventListener('click', exportAsPDF);
    document.getElementById('export-csv').addEventListener('click', exportAsCSV);
    document.getElementById('export-print').addEventListener('click', printResults);
}

// Export diagnostic results as PDF
function exportAsPDF() {
    // Get diagnostic results
    const diagnosticResults = getDiagnosticResults();
    if (!diagnosticResults) return;
    
    // Create a new window for PDF export
    const printWindow = window.open('', '_blank');
    
    // Create PDF content
    const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>AutoCare Diagnostic Results</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    color: #e53e3e;
                    border-bottom: 2px solid #e53e3e;
                    padding-bottom: 10px;
                }
                h2 {
                    color: #e53e3e;
                    margin-top: 20px;
                }
                .result-section {
                    margin-bottom: 20px;
                    padding: 15px;
                    background-color: #f8f8f8;
                    border-radius: 5px;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 0.8em;
                    color: #666;
                }
                .confidence {
                    display: inline-block;
                    padding: 3px 8px;
                    border-radius: 12px;
                    font-size: 0.8em;
                    font-weight: bold;
                    color: white;
                    background-color: #e53e3e;
                }
            </style>
        </head>
        <body>
            <h1>AutoCare AI Diagnostic Results</h1>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
            
            <div class="result-section">
                <h2>Vehicle Issue</h2>
                <p>${diagnosticResults.issue}</p>
            </div>
            
            <div class="result-section">
                <h2>Possible Causes</h2>
                <ul>
                    ${diagnosticResults.causes.map(cause => `
                        <li>
                            ${cause.text} 
                            <span class="confidence">${cause.confidence}% confidence</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h2>Car Health</h2>
                <p>${diagnosticResults.health}</p>
            </div>
            
            <div class="result-section">
                <h2>Recommended Parts</h2>
                <ul>
                    ${diagnosticResults.parts.map(part => `<li>${part}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h2>Repair Information</h2>
                <p><strong>Estimated Difficulty:</strong> ${diagnosticResults.difficulty || 'N/A'}</p>
                <p><strong>Estimated Cost:</strong> ${diagnosticResults.cost || 'N/A'}</p>
            </div>
            
            <div class="footer">
                <p>Generated by AutoCare AI Diagnostic System</p>
                <p>© ${new Date().getFullYear()} AutoCare</p>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `;
    
    // Write content to new window
    printWindow.document.open();
    printWindow.document.write(pdfContent);
    printWindow.document.close();
}

// Export diagnostic results as CSV
function exportAsCSV() {
    // Get diagnostic results
    const diagnosticResults = getDiagnosticResults();
    if (!diagnosticResults) return;
    
    // Create CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Add headers
    csvContent += 'Category,Detail,Confidence\n';
    
    // Add issue
    csvContent += `Issue,"${diagnosticResults.issue.replace(/"/g, '""')}",\n`;
    
    // Add causes
    diagnosticResults.causes.forEach(cause => {
        csvContent += `Cause,"${cause.text.replace(/"/g, '""')}",${cause.confidence}%\n`;
    });
    
    // Add health
    csvContent += `Health,"${diagnosticResults.health.replace(/"/g, '""')}",\n`;
    
    // Add parts
    diagnosticResults.parts.forEach(part => {
        csvContent += `Part,"${part.replace(/"/g, '""')}",\n`;
    });
    
    // Add repair info
    if (diagnosticResults.difficulty) {
        csvContent += `Repair Difficulty,"${diagnosticResults.difficulty.replace(/"/g, '""')}",\n`;
    }
    
    if (diagnosticResults.cost) {
        csvContent += `Repair Cost,"${diagnosticResults.cost.replace(/"/g, '""')}",\n`;
    }
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `autocare-diagnostic-${Date.now()}.csv`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
}

// Print diagnostic results
function printResults() {
    window.print();
}

// Get diagnostic results from the page
function getDiagnosticResults() {
    const issueElement = document.getElementById('diagnostic-issue');
    const causesElement = document.getElementById('possible-causes');
    const healthElement = document.getElementById('car-health');
    const partsElement = document.getElementById('recommended-parts');
    const difficultyElement = document.getElementById('repair-difficulty');
    const costElement = document.getElementById('repair-cost');
    
    if (!issueElement || !causesElement || !healthElement || !partsElement) {
        alert('No diagnostic results found. Please run a diagnosis first.');
        return null;
    }
    
    // Get issue
    const issue = issueElement.textContent.trim();
    
    // Get causes with confidence
    const causes = [];
    const causeItems = causesElement.querySelectorAll('li');
    causeItems.forEach(item => {
        const text = item.textContent.trim();
        const confidenceMatch = text.match(/(\d+)% confidence/);
        const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 0;
        const causeText = text.replace(/\d+% confidence/, '').trim();
        causes.push({ text: causeText, confidence });
    });
    
    // Get health
    const health = healthElement.textContent.trim();
    
    // Get parts
    const parts = [];
    const partItems = partsElement.querySelectorAll('li');
    partItems.forEach(item => {
        parts.push(item.textContent.trim());
    });
    
    // Get repair info
    const difficulty = difficultyElement ? difficultyElement.textContent.trim() : null;
    const cost = costElement ? costElement.textContent.trim() : null;
    
    return {
        issue,
        causes,
        health,
        parts,
        difficulty,
        cost
    };
}