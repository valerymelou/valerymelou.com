const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getLcovFiles = function (src) {
  return new Promise((resolve, reject) => {
    glob(`${src}/**/lcov.info`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

(async function () {
  const files = await getLcovFiles('coverage');
  if (files && files instanceof Array) {
    const mergedReport = files.reduce(
      (mergedReport, currFile) => (mergedReport += fs.readFileSync(currFile)),
      '',
    );
    await fs.writeFile(
      path.resolve('./coverage/lcov.info'),
      mergedReport,
      (err) => {
        if (err) console.log(err); // we don't break the pipeline cause of this;
        console.log('The file has been saved!');
      },
    );
  }
})();
