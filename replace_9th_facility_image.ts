import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const facilityCourses = [');
const endIndex = content.indexOf('export const constructionCourses = [');

let before = content.substring(0, startIndex);
let facilityContent = content.substring(startIndex, endIndex);
let after = content.substring(endIndex);

let imageIndex = 0;
facilityContent = facilityContent.replace(/image:\s*'([^']+)'/g, (match, url) => {
  imageIndex++;
  if (imageIndex === 9) {
    return "image: 'https://image2url.com/r2/default/images/1775023201269-34a8d19d-8ca0-48f5-89f3-9286b52ebced.jpg'";
  }
  return match;
});

fs.writeFileSync(file, before + facilityContent + after);
console.log("Replaced image at index " + imageIndex);
