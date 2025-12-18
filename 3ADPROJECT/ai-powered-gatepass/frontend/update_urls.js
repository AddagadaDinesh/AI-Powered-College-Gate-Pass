const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const target = 'http://localhost:5000';
const replacement = 'https://ai-powered-college-gate-pass-3.onrender.com';

try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file.endsWith('.jsx') || file.endsWith('.js')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes(target)) {
                console.log(`Updating: ${file}`);
                const updatedContent = content.split(target).join(replacement);
                fs.writeFileSync(filePath, updatedContent, 'utf8');
            }
        }
    });
    console.log('Update complete.');
} catch (err) {
    console.error('Error:', err.message);
}
