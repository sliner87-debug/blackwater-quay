import re

css_additions = '''
/* Accordion Styles */
.accordion-item {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
}

.accordion-btn {
    background-color: transparent;
    color: #e2e8f0;
    cursor: pointer;
    padding: 15px 20px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    font-size: 1.1em;
    font-weight: 700;
    transition: 0.3s;
    font-family: 'Cinzel', serif;
    position: relative;
}

.accordion-btn:hover, .accordion-btn.active {
    background-color: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
}

.accordion-btn:after {
    content: '\\002B';
    color: #38bdf8;
    font-weight: bold;
    float: right;
    margin-left: 5px;
}

.accordion-btn.active:after {
    content: "\\2212";
}

.accordion-panel {
    padding: 0 20px;
    background-color: transparent;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}
'''

with open('h:/Antigravity/Novel/shipyard.css', 'a', encoding='utf-8') as f:
    f.write(css_additions)
print("CSS appended.")
import re

css_path = "h:/Antigravity/Novel/shipyard.css"
with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

new_css = """
/* Dynamic Item Descriptions */
.item-desc {
    font-size: 0.9rem;
    color: var(--text-primary);
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 10px 14px;
    margin-top: 6px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    line-height: 1.5;
    display: block;
    min-height: 2.5rem;
}
.item-desc strong {
    color: var(--accent-cyan);
}
"""

content = re.sub(r'/\* Dynamic Item Descriptions \*/.*?\.item-desc strong \{[^}]+\}', new_css, content, flags=re.DOTALL)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated CSS!")
