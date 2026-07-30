// codex_wiki.js
// Auto-generates a sticky sidebar table of contents for the Codex

document.addEventListener('DOMContentLoaded', () => {
    // Only run on the codex page
    if (!document.title.includes('Codex')) return;

    // Create the sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'wiki-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '100px'; // Below the header
    sidebar.style.left = '0';
    sidebar.style.width = '250px';
    sidebar.style.height = 'calc(100vh - 100px)';
    sidebar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    sidebar.style.borderRight = '2px solid #d4af37';
    sidebar.style.padding = '20px';
    sidebar.style.overflowY = 'auto';
    sidebar.style.zIndex = '999';
    sidebar.style.fontFamily = "'Inter', sans-serif";
    sidebar.style.color = '#e2e8f0';
    sidebar.style.boxShadow = '2px 0 10px rgba(0,0,0,0.5)';
    sidebar.style.transform = 'translateX(0)';
    sidebar.style.transition = 'transform 0.3s ease-in-out';

    const sidebarTitle = document.createElement('h3');
    sidebarTitle.textContent = 'Codex Index';
    sidebarTitle.style.color = '#d4af37';
    sidebarTitle.style.fontFamily = "'Cinzel', serif";
    sidebarTitle.style.borderBottom = '1px solid #475569';
    sidebarTitle.style.paddingBottom = '10px';
    sidebarTitle.style.marginBottom = '15px';
    sidebar.appendChild(sidebarTitle);

    const ul = document.createElement('ul');
    ul.style.listStyleType = 'none';
    ul.style.padding = '0';
    sidebar.appendChild(ul);

    // Find all h3 section titles
    const sections = document.querySelectorAll('h3.section-title, h2');
    
    sections.forEach((sec, index) => {
        if (!sec.id) {
            sec.id = 'wiki-section-' + index;
        }
        
        const li = document.createElement('li');
        li.style.marginBottom = '10px';
        
        const a = document.createElement('a');
        a.href = '#' + sec.id;
        a.textContent = sec.innerText;
        a.style.color = '#94a3b8';
        a.style.textDecoration = 'none';
        a.style.fontSize = sec.tagName.toLowerCase() === 'h2' ? '1rem' : '0.85rem';
        a.style.fontWeight = sec.tagName.toLowerCase() === 'h2' ? 'bold' : 'normal';
        a.style.paddingLeft = sec.tagName.toLowerCase() === 'h2' ? '0' : '15px';
        a.style.display = 'block';
        a.style.transition = 'color 0.2s';
        
        a.onmouseover = () => a.style.color = '#d4af37';
        a.onmouseout = () => a.style.color = '#94a3b8';
        
        li.appendChild(a);
        ul.appendChild(li);
    });

    document.body.appendChild(sidebar);

    // Push the main content over so it doesn't hide behind the sidebar
    const mainContainer = document.querySelector('.container') || document.querySelector('main') || document.body;
    if (mainContainer === document.body) {
        // Find the first major wrapper
        const wrapper = document.querySelector('div');
        if (wrapper) wrapper.style.marginLeft = '250px';
    } else {
        mainContainer.style.marginLeft = '250px';
    }
    
    // Add a toggle button for mobile
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '&#9776;';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.left = '20px';
    toggleBtn.style.zIndex = '1000';
    toggleBtn.style.backgroundColor = '#d4af37';
    toggleBtn.style.color = '#000';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.width = '50px';
    toggleBtn.style.height = '50px';
    toggleBtn.style.fontSize = '24px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.5)';
    
    let sidebarOpen = true;
    toggleBtn.onclick = () => {
        sidebarOpen = !sidebarOpen;
        sidebar.style.transform = sidebarOpen ? 'translateX(0)' : 'translateX(-100%)';
        if (mainContainer) {
            mainContainer.style.marginLeft = sidebarOpen ? '250px' : '0';
        }
    };
    
    document.body.appendChild(toggleBtn);
});
