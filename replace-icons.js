const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replacements object
const replacements = [
  {
    regex: /<div\s+class="desktop-icon"\s+data-window="win-mycomputer"[^>]*>[\s\S]*?<svg[^>]*>[\s\S]*?<\/svg>/m,
    replace: <div class="desktop-icon" data-window="win-mycomputer" ondblclick="openWindow('win-mycomputer')">\n      <img src="windows98-icons/png/computer_explorer-4.png" alt="" />
  },
  {
    regex: /<div\s+class="desktop-icon"\s+data-window="win-winamp"[^>]*>[\s\S]*?<svg[^>]*>[\s\S]*?<\/svg>/m,
    replace: <div class="desktop-icon" data-window="win-winamp" ondblclick="openWindow('win-winamp')">\n      <img src="windows98-icons/png/cd_audio_cd_a-3.png" alt="" />
  },
  {
    regex: /<div\s+class="desktop-icon"\s+data-window="win-productor"[^>]*>[\s\S]*?<svg[^>]*>[\s\S]*?<\/svg>/m,
    replace: <div class="desktop-icon" data-window="win-productor" ondblclick="openWindow('win-productor')">\n      <img src="windows98-icons/png/directory_closed-4.png" alt="" />
  },
  {
    regex: /<div\s+class="desktop-icon"\s+data-window="win-about"[^>]*>[\s\S]*?<svg[^>]*>[\s\S]*?<\/svg>/m,
    replace: <div class="desktop-icon" data-window="win-about" ondblclick="openWindow('win-about')">\n      <img src="windows98-icons/png/notepad_file-0.png" alt="" />
  },
  // Start button SVG
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<span data-i18n="start_btn">)/m,
    replace: <img src="windows98-icons/png/windows-0.png" alt="" />\n      
  },
  // Taskbar / Start Menu Items: Winamp
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<span data-i18n="winamp">)/m,
    replace: <img src="windows98-icons/png/cd_audio_cd_a-0.png" alt="" />\n        
  },
  // Start menu items: Links
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<span>Links<\/span>)/m,
    replace: <img src="windows98-icons/png/directory_closed-0.png" alt="" />\n        
  },
  // Start menu item: About (Sobre Mi)
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<span data-i18n="about">)/m,
    replace: <img src="windows98-icons/png/notepad_file-0.png" alt="" />\n        
  },
  // Start Menu Items: Settings
  {
    regex: /<svg[^>]*>[\s\S]*?<\/svg>\s*(<span data-i18n="settings">)/m,
    replace: <img src="windows98-icons/png/settings_gear-0.png" alt="" style="width: 16px; height: 16px; margin-right: 4px; image-rendering: pixelated;" />\n        
  },
  // Start Menu Items: Shutdown
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<span data-i18n="shutdown">)/m,
    replace: <img src="windows98-icons/png/shut_down_normal-0.png" alt="" />\n        
  },
  // Window Titles (Taskbar active & inactive, also titlebar)
  // My Computer Window title bar
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<div class="title-bar-text" data-i18n="window_mycomputer">)/m,
    replace: <img src="windows98-icons/png/computer_explorer-0.png" alt="" style="width: 16px; height: 16px; image-rendering: pixelated;" />\n        
  },
  // Winamp window title bar
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<div class="title-bar-text">Winamp<\/div>)/m,
    replace: <img src="windows98-icons/png/cd_audio_cd_a-0.png" alt="" style="width: 16px; height: 16px; image-rendering: pixelated;" />\n        
  },
  // Productor window title bar
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<div class="title-bar-text">Links<\/div>)/m,
    replace: <img src="windows98-icons/png/directory_closed-0.png" alt="" style="width: 16px; height: 16px; image-rendering: pixelated;" />\n        
  },
  // About window title bar
  {
    regex: /<img[^>]+src="data:image\/svg[^>]+><\/svg>"[^>]*>\s*(<div class="title-bar-text" data-i18n="window_about">)/m,
    replace: <img src="windows98-icons/png/notepad_file-0.png" alt="" style="width: 16px; height: 16px; image-rendering: pixelated;" />\n        
  },
  // JS Render Explorer
  {
    regex: /svgIcon = \<svg[^>]+>[\s\S]*?<\/svg>\;\s*el\.ondblclick = \(\) => {\s*currentPath\.push\(key\);\s*renderMyComputer\(\);\s*};/m,
    replace: svgIcon = '<img src="windows98-icons/png/directory_closed-4.png" alt="" />';\n            el.ondblclick = () => {\n              currentPath.push(key);\n              renderMyComputer();\n            };
  },
  {
    regex: /svgIcon = \<svg[^>]+>[\s\S]*?<\/svg>\;\s*el\.ondblclick = \(\) => {\s*loadTrack\(item\.path, item\.name\);\s*};/m,
    replace: svgIcon = '<img src="windows98-icons/png/cd_audio_cd_a-3.png" alt="" />';\n            el.ondblclick = () => {\n              loadTrack(item.path, item.name);\n            };
  },
  {
    regex: /svgIcon = \<svg[^>]+>[\s\S]*?<\/svg>\;\s*el\.ondblclick = \(\) => {\s*alert\(translate\('file_content'\) \+ item\.content\);\s*};/m,
    replace: svgIcon = '<img src="windows98-icons/png/notepad_file-0.png" alt="" />';\n            el.ondblclick = () => {\n              alert(translate('file_content') + item.content);\n            };
  }
];

let i = 0;
for (const r of replacements) {
    if (html.match(r.regex)) {
        html = html.replace(r.regex, r.replace);
        console.log('Replaced item ' + i);
    } else {
        console.error('Failed to match item ' + i);
    }
    i++;
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done');
