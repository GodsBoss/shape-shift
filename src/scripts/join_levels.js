var fs = require('fs');

var sourceDir = process.argv[2];
var targetFile = process.argv[3];

var inputFiles = fs.readdirSync(sourceDir);

var levels = {
  levels: []
};

inputFiles.forEach(function(path) { levels.levels.push(JSON.parse(fs.readFileSync(sourceDir + '/' + path))); });

fs.writeFileSync(targetFile, JSON.stringify(levels));
