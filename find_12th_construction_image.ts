import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const constructionCourses = [');

let constructionContent = content.substring(startIndex);

let count = 0;
let pos = 0;
while (true) {
  let nextTitle = constructionContent.indexOf('title: \'', pos);
  if (nextTitle === -1) break;
  count++;
  if (count === 12) {
    let endOfLine = constructionContent.indexOf('\n', nextTitle);
    console.log("Course title:", constructionContent.substring(nextTitle, endOfLine));
    
    let imagePos = constructionContent.indexOf('image:', nextTitle);
    let imageEnd = constructionContent.indexOf('\n', imagePos);
    console.log("Image:", constructionContent.substring(imagePos, imageEnd));
    break;
  }
  pos = nextTitle + 1;
}
