const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getLcovFiles = function (src) {
  return new Promise((resolve, reject) => {
    glob(`${src}/**/lcov.info`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
      return null;
    });
  });
};

(async function () {
  const files = await getLcovFiles('coverage');
  if (files && files instanceof Array) {
    const mergedReport = files.reduce(
      (report, currFile) => (report += fs.readFileSync(currFile)),
      '',
    );
    await fs.writeFile(
      path.resolve('./coverage/lcov.info'),
      mergedReport,
      (err) => {
        if (err) console.log(err); // skipcq: JS-0002
        console.log('The file has been saved!'); // skipcq: JS-0002
        return null;
      },
    );
  }
})();
