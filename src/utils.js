const fs = require('fs');
const path = require('path');

/**
 * Finds files with the specified extensions.
 * @param {string} startPath
 * @param {string[]} extensions
 * @param {number} maxDepth
 * @param {number} currentDepth
 * @returns {string[]}
 */
function findFilesWithExtensions(startPath, extensions, maxDepth, currentDepth = 0) {
    const results = [];

    if (currentDepth > maxDepth)
        return results;

    const files = fs.readdirSync(startPath);
    for (const file of files) {
        const filePath = path.join(startPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory())
            results.push(...findFilesWithExtensions(filePath, extensions, maxDepth, currentDepth + 1));
        if (extensions.includes(path.extname(file)))
            results.push(filePath);
    }

    return results;
}

module.exports.findFilesWithExtensions = findFilesWithExtensions;
