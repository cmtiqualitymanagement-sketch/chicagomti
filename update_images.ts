import fs from 'fs';

const file = 'src/pages/Courses.tsx';
let content = fs.readFileSync(file, 'utf8');

const images = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800', // 1. CCM (Engineer with blueprint)
  'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&q=80&w=800', // 2. BIM
  'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800', // 3. PMI-CP
  'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800', // 4. CRM
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800', // 5. CCC
  'https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&q=80&w=800', // 6. LEED ID+C
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800', // 7. LEED Green Assoc
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', // 8. LEED BD+C
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', // 9. CCQM
  'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800', // 10. CPC
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800', // 11. HPBDP
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800', // 12. OSHA
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800', // 13. Supervisory
  'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80&w=800', // 14. UAE Regs
  'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&q=80&w=800', // 15. Healthcare
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', // 16. First Aid
  'https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&q=80&w=800', // 17. Confined Space
  'https://images.unsplash.com/photo-1590644365607-1c5a49152e19?auto=format&fit=crop&q=80&w=800', // 18. Sustainable Materials
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800', // 19. HVAC/MEP
  'https://images.unsplash.com/photo-1580983546524-1191be153723?auto=format&fit=crop&q=80&w=800', // 20. Concrete/Steel
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800', // 21. Claims
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800', // 22. Waste
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'  // 23. Drawings
];

// Find the start of constructionCourses
const startIndex = content.indexOf('export const constructionCourses = [');
if (startIndex === -1) {
  console.error("Could not find constructionCourses array");
  process.exit(1);
}

let before = content.substring(0, startIndex);
let after = content.substring(startIndex);

let imageIndex = 0;
after = after.replace(/image:\s*'[^']+'/g, (match) => {
  if (imageIndex < images.length) {
    const newImage = `image: '${images[imageIndex]}'`;
    imageIndex++;
    return newImage;
  }
  return match;
});

fs.writeFileSync(file, before + after);
console.log(`Replaced ${imageIndex} images.`);
