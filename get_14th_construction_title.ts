import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const constructionCourses = [');
let constructionContent = content.substring(startIndex);

let count = 0;
let pos = 0;
while (true) {
  let nextTitle = constructionContent.indexOf('title:', pos);
  if (nextTitle === -1) break;
  count++;
  if (count === 14) {
    let endOfLine = constructionContent.indexOf('\n', nextTitle);
    console.log(constructionContent.substring(nextTitle, endOfLine));
    break;
  }
  pos = nextTitle + 1;
}
