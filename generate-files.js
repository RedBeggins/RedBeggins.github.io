const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, 'public', 'MyPC');
const OUTPUT_FILE = path.join(__dirname, 'data', 'files.json');

// Helper to determine type based on extension
function getFileType(ext) {
  const extension = ext.toLowerCase();
  if (['.mp3', '.wav', '.ogg'].includes(extension)) return 'audio';
  if (['.txt', '.md', '.json', '.js', '.html', '.css'].includes(extension)) return 'text';
  if (['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(extension)) return 'image';
  if (['.exe', '.bat'].includes(extension)) return 'executable';
  return 'unknown';
}

function scanDir(dirName, basePath) {
  const result = {};
  
  if (!fs.existsSync(dirName)) {
    return result;
  }

  const items = fs.readdirSync(dirName);
  
  for (const item of items) {
    const fullPath = path.join(dirName, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Append a colon to single-letter folder names like 'C' or 'D' to match the old style,
      // or just keep the folder name. We'll use the exact folder name.
      const folderKey = item === 'C' || item === 'D' ? item + ':' : item;
      result[folderKey] = {
        type: 'folder',
        contents: scanDir(fullPath, `${basePath}/${item}`)
      };
    } else {
      const ext = path.extname(item);
      const nameWithoutExt = path.basename(item, ext);
      
      // Format name: replace underscores with spaces and uppercase it (like TRACK 01)
      const formattedName = nameWithoutExt.replace(/[-_]/g, ' ').toUpperCase();
      
      result[item] = {
        type: getFileType(ext),
        name: formattedName,
        path: `${basePath}/${item}`
      };
    }
  }
  
  return result;
}

try {
  // We simulate "C:" and "D:" as top level folders inside public/MyPC
  // Or we just scan MyPC and its root folders become the root keys
  console.log(`Scanning directory: ${ROOT_DIR}`);
  const data = scanDir(ROOT_DIR, 'MyPC');
  
  // Ensure the data directory exists
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully generated files.json at ${OUTPUT_FILE}`);
} catch (error) {
  console.error("Error generating files:", error);
  process.exit(1);
}
