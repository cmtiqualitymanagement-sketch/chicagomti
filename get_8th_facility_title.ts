import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const facilityCourses = [');
let facilityContent = content.substring(startIndex);

let count = 0;
let pos = 0;
while (true) {
  let nextTitle = facilityContent.indexOf('title:', pos);
  if (nextTitle === -1) break;
  count++;
  if (count === 8) {
    let endOfLine = facilityContent.indexOf('\n', nextTitle);
    console.log(facilityContent.substring(nextTitle, endOfLine));
    break;
  }
  pos = nextTitle + 1;
}
