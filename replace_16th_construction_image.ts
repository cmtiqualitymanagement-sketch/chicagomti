import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const constructionCourses = [');

let before = content.substring(0, startIndex);
let constructionContent = content.substring(startIndex);

let imageIndex = 0;
constructionContent = constructionContent.replace(/image:\s*'([^']+)'/g, (match, url) => {
  imageIndex++;
  if (imageIndex === 16) {
    return "image: 'https://image2url.com/r2/default/images/1775024287120-024e6502-abbf-45bc-a0b1-eb3745fdcc5e.webp'";
  }
  return match;
});

fs.writeFileSync(file, before + constructionContent);
console.log("Replaced image at index " + imageIndex);
