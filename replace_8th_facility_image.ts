import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('export const facilityCourses = [');

if (startIndex === -1) {
  console.log("Could not find facilityCourses array");
  process.exit(1);
}

let before = content.substring(0, startIndex);
let facilityContent = content.substring(startIndex);

let imageIndex = 0;
facilityContent = facilityContent.replace(/image:\s*'([^']+)'/g, (match, url) => {
  imageIndex++;
  if (imageIndex === 8) {
    return "image: 'https://image2url.com/r2/default/images/1775026063961-a3f361d9-b810-4ac7-8061-f15f4328ca41.jfif'";
  }
  return match;
});

fs.writeFileSync(file, before + facilityContent);
console.log("Replaced image at index " + imageIndex);
