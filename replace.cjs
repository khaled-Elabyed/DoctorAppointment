const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('http://localhost:3500')) {
        content = content.replace(/"http:\/\/localhost:3500([^"]*)"/g, '`${import.meta.env.VITE_API_URL || \'http://localhost:3500\'}$1`');
        content = content.replace(/'http:\/\/localhost:3500([^']*)'/g, '`${import.meta.env.VITE_API_URL || \'http://localhost:3500\'}$1`');
        fs.writeFileSync(fullPath, content);
        console.log('Updated ' + fullPath);
      }
    }
  }
}

processDir('c:/Users/dell/Projets/DoctorAppointment/frontend/src');
console.log('Done');
