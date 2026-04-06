import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const facilityCourses = [');
const endIndex = content.indexOf('export const constructionCourses = [');

let facilityContent = content.substring(startIndex, endIndex);

let count = 0;
let pos = 0;
while (true) {
  let nextTitle = facilityContent.indexOf('title: \'', pos);
  if (nextTitle === -1) break;
  count++;
  if (count === 15) {
    let endOfLine = facilityContent.indexOf('\n', nextTitle);
    console.log("Course title:", facilityContent.substring(nextTitle, endOfLine));
    
    let imagePos = facilityContent.indexOf('image:', nextTitle);
    let imageEnd = facilityContent.indexOf('\n', imagePos);
    console.log("Image:", facilityContent.substring(imagePos, imageEnd));
    break;
  }
  pos = nextTitle + 1;
}
