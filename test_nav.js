const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('live_index.html', 'utf-8');
const dom = new JSDOM(html);
const doc = dom.window.document;
const menus = doc.querySelectorAll('.nav-menu > li > a');
menus.forEach(m => console.log('MENU:', m.textContent.trim()));
