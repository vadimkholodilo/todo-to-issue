const fs = require('fs');
const path = require('path');

module.exports.findCsFiles = (startPath, maxDepth, currentDepth = 0) => {
    const results = [];

    if (currentDepth > maxDepth) {
        return results;
    }

    const files = fs.readdirSync(startPath);

    for (const file of files) {
        const filePath = path.join(startPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results.push(...findCsFiles(filePath, maxDepth, currentDepth + 1));
        }

        if (path.extname(file) === '.cs') {
            results.push(filePath);
        }
    }

    return results;
};
