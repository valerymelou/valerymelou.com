const fs = require('fs').promises;
const path = require('path');

const getLcovFiles = async function (src) {
  const lcovFiles = [];

  async function findLcovFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await findLcovFiles(fullPath);
      } else if (entry.isFile() && entry.name === 'lcov.info') {
        lcovFiles.push(fullPath);
      }
    }
  }

  await findLcovFiles(src);
  return lcovFiles;
};

(async function () {
  try {
    const files = await getLcovFiles('coverage');
    if (files && files.length > 0) {
      const mergedReport = await files.reduce(
        async (reportPromise, currFile) => {
          const report = await reportPromise;
          const fileContent = await fs.readFile(currFile, 'utf8');
          return report + fileContent;
        },
        Promise.resolve(''),
      );

      await fs.writeFile('coverage/merged-lcov.info', mergedReport, 'utf8');
      console.log('Merged lcov files successfully.');
    } else {
      console.log('No lcov files found.');
    }
  } catch (error) {
    console.error('Error merging lcov files:', error);
  }
})();
