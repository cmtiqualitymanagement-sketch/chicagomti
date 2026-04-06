import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const constructionCourses = [');

let before = content.substring(0, startIndex);
let constructionContent = content.substring(startIndex);

let imageIndex = 0;
constructionContent = constructionContent.replace(/image:\s*'([^']+)'/g, (match, url) => {
  imageIndex++;
  if (imageIndex === 23) {
    return "image: 'https://image2url.com/r2/default/images/1775025422734-cc5f9c16-165b-4170-8b5d-97b4b3100944.jpg'";
  }
  return match;
});

fs.writeFileSync(file, before + constructionContent);
console.log("Replaced image at index " + imageIndex);
