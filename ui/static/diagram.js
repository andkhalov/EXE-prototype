document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("diagram");
  if (!container) return;

  container.innerHTML = `
    <svg width="500" height="140" style="border:1px solid #1abc9c;">
      <!-- Creator -->
      <circle cx="80" cy="70" r="30" fill="#1abc9c"/>
      <text x="80" y="70" fill="#FFFFFF" font-size="14" text-anchor="middle" alignment-baseline="middle">Creator</text>

      <!-- GPU -->
      <circle cx="220" cy="70" r="30" fill="#2ecc71"/>
      <text x="220" y="70" fill="#FFFFFF" font-size="14" text-anchor="middle" alignment-baseline="middle">GPU</text>

      <!-- Validator -->
      <circle cx="360" cy="70" r="30" fill="#3498db"/>
      <text x="360" y="70" fill="#FFFFFF" font-size="14" text-anchor="middle" alignment-baseline="middle">Validator</text>

      <!-- Lines (white) -->
      <line x1="110" y1="70" x2="190" y2="70" stroke="#FFFFFF" stroke-width="2" marker-end="url(#arrow)"/>
      <line x1="250" y1="70" x2="330" y2="70" stroke="#FFFFFF" stroke-width="2" marker-end="url(#arrow)"/>

      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10"
                refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#FFFFFF"/>
        </marker>
      </defs>
    </svg>
  `;
});
