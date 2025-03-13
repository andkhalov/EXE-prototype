document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("diagram");
    if (!container) return;
  
    // Минималистичный SVG с тремя кружками и стрелками
    container.innerHTML = `
      <svg width="400" height="120" style="border:1px solid #ccc;">
        <!-- Creator -->
        <circle cx="70" cy="60" r="20" fill="blue"/>
        <text x="70" y="60" fill="white" font-size="12" text-anchor="middle" alignment-baseline="middle">Creator</text>
  
        <!-- GPU -->
        <circle cx="200" cy="60" r="20" fill="green"/>
        <text x="200" y="60" fill="white" font-size="12" text-anchor="middle" alignment-baseline="middle">GPU</text>
  
        <!-- Validator -->
        <circle cx="330" cy="60" r="20" fill="orange"/>
        <text x="330" y="60" fill="white" font-size="12" text-anchor="middle" alignment-baseline="middle">Validator</text>
  
        <!-- Lines -->
        <line x1="90" y1="60" x2="180" y2="60" stroke="black" marker-end="url(#arrow)"/>
        <line x1="220" y1="60" x2="310" y2="60" stroke="black" marker-end="url(#arrow)"/>
  
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10"
                  refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="black"/>
          </marker>
        </defs>
      </svg>
    `;
  });
  