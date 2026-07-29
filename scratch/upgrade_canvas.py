import re

with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will replace everything from "// Canvas Setup" down to the end of the file.
regex = r"// Canvas Setup.*$"

new_canvas_logic = '''// Canvas Setup
const canvas = document.getElementById('vtt-canvas');
const ctx = canvas.getContext('2d');
let activeImageObj = null;
let activeDataType = null; // 'hull', 'weapon', 'armor'
let activeRotation = 0; // in radians
const placedItems = [];

// Interaction State
let selectedItem = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Handle Palette Selection
document.querySelectorAll('.draggable-part').forEach(img => {
    img.addEventListener('click', (e) => {
        // Toggle selection off if already selected
        if (e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
            activeImageObj = null;
            activeDataType = null;
            return;
        }
        
        // Clear previous selection
        document.querySelectorAll('.draggable-part').forEach(i => i.classList.remove('selected'));
        // Select new
        e.target.classList.add('selected');
        
        // Load image obj
        activeImageObj = new Image();
        activeImageObj.src = e.target.getAttribute('data-src');
        activeDataType = e.target.getAttribute('data-type');
        activeRotation = 0; // reset rotation
        selectedItem = null; // deselect canvas item when picking from palette
        redrawCanvas();
    });
});

// Handle Canvas Interactions (Click, Drag, Select)
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If we have an active item from palette, PLACE IT
    if (activeImageObj) {
        placedItems.push({
            img: activeImageObj,
            type: activeDataType,
            x: x,
            y: y,
            rotation: activeRotation,
            scale: 1.0,
            layer: activeDataType === 'hull' ? 0 : 1 // Hulls at bottom
        });
        
        // Deselect palette so we don't accidentally stamp multiple (optional, but good for UX)
        // Or keep it selected for multiple weapons. Let's keep it selected.
        redrawCanvas();
        return;
    }
    
    // Otherwise, try to SELECT an existing item
    // Search backwards to select top-most item first
    selectedItem = null;
    for (let i = placedItems.length - 1; i >= 0; i--) {
        const item = placedItems[i];
        const w = item.img.width * item.scale;
        const h = item.img.height * item.scale;
        // Basic bounding box check (doesn't account perfectly for rotation, but close enough for VTT tokens)
        if (x >= item.x - w/2 && x <= item.x + w/2 && y >= item.y - h/2 && y <= item.y + h/2) {
            selectedItem = item;
            isDragging = true;
            dragOffsetX = x - item.x;
            dragOffsetY = y - item.y;
            break;
        }
    }
    redrawCanvas();
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && selectedItem) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        selectedItem.x = x - dragOffsetX;
        selectedItem.y = y - dragOffsetY;
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

// Handle Keyboard Controls
window.addEventListener('keydown', (e) => {
    if (vttModeDiv.style.display !== 'grid') return;
    
    // Rotation for palette active item OR selected canvas item
    if (e.key === 'r' || e.key === 'R') {
        if (selectedItem) {
            selectedItem.rotation += Math.PI / 2;
            redrawCanvas();
        } else if (activeImageObj) {
            activeRotation += Math.PI / 2;
        }
    }
    
    // Scaling and Deletion for selected item
    if (selectedItem) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedItem.scale += 0.1;
            redrawCanvas();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedItem.scale = Math.max(0.2, selectedItem.scale - 0.1);
            redrawCanvas();
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            const index = placedItems.indexOf(selectedItem);
            if (index > -1) {
                placedItems.splice(index, 1);
                selectedItem = null;
                redrawCanvas();
            }
        }
    }
});

// Draw Grid function
function drawGrid() {
    if(!ctx) return;
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
    ctx.lineWidth = 1;
    for(let i=0; i<=800; i+=40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 800); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(800, i); ctx.stroke();
    }
}

// Redraw everything
function redrawCanvas() {
    if(!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background color
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();

    // Sort by layer so hulls are drawn first
    const sortedItems = [...placedItems].sort((a, b) => a.layer - b.layer);

    sortedItems.forEach(item => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        
        const w = item.img.width * item.scale;
        const h = item.img.height * item.scale;
        
        // Highlight if selected
        if (item === selectedItem) {
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.strokeRect(-w/2, -h/2, w, h);
        }
        
        ctx.drawImage(item.img, -w/2, -h/2, w, h);
        ctx.restore();
    });
}

// Initial draw
redrawCanvas();

// Clear Button
document.getElementById('clear-canvas-btn').addEventListener('click', () => {
    placedItems.length = 0;
    selectedItem = null;
    redrawCanvas();
});

// Download Button
document.getElementById('download-vtt-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'custom_vtt_ship.png';
    link.href = dataURL;
    link.click();
});
'''

new_js = re.sub(regex, new_canvas_logic, js, flags=re.DOTALL)

with open('h:/Antigravity/Novel/shipyard.js', 'w', encoding='utf-8') as f:
    f.write(new_js)
print("Updated Canvas JS")
