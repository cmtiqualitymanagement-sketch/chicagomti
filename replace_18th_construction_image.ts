import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const constructionCourses = [');

let before = content.substring(0, startIndex);
let constructionContent = content.substring(startIndex);

let imageIndex = 0;
constructionContent = constructionContent.replace(/image:\s*'([^']+)'/g, (match, url) => {
  imageIndex++;
  if (imageIndex === 18) {
    return "image: 'https://image2url.com/r2/default/images/1775024533773-8514353d-d271-492a-8f6e-bd5aa3a9df23.jpg'";
  }
  return match;
});

fs.writeFileSync(file, before + constructionContent);
console.log("Replaced image at index " + imageIndex);
