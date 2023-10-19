const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');

const downloadFolder = '/Users/pedropolanco/Downloads';
const destinationFolder = '/Users/pedropolanco/Documents/ebooks';

const moveEpub = (filePath) => {
    const fileName = path.basename(filePath);
    const destinationPath = path.join(destinationFolder, fileName);

    fs.rename(filePath, destinationPath, (err) => {
        if (err) {
            console.error(`Error moving file ${fileName}:`, err);
        } else {
            console.log(`Moved ${fileName} to ${destinationFolder}`);
        }
    });
};

// Watch the download folder for changes
const watcher = chokidar.watch(downloadFolder, { ignored: /^\./, persistent: true });

watcher.on('add', (filePath) => {
    // Check if the added file is an ePub
    if (path.extname(filePath).toLowerCase() === '.epub') {
        moveEpub(filePath);
    }
});

console.log(`Watching ${downloadFolder} for new ePub files...`);
