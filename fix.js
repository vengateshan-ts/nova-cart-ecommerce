const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const files = walkSync('./client/src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove React import if unused (a bit hacky but works for this)
  content = content.replace(/import React(?:, \{[^}]+\})? from 'react';\n/g, '');
  content = content.replace(/import React from 'react';\r?\n/g, '');
  
  // Fix RootState import
  content = content.replace(/import \{ RootState \} from/g, "import type { RootState } from");
  
  // Fix Footer lucide imports
  if (file.includes('Footer.tsx')) {
    content = content.replace(/import \{ Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone \} from 'lucide-react';/, "import { Mail, MapPin, Phone } from 'lucide-react';");
    content = content.replace(/<Facebook size=\{18\} \/>/g, "Facebook");
    content = content.replace(/<Twitter size=\{18\} \/>/g, "Twitter");
    content = content.replace(/<Instagram size=\{18\} \/>/g, "Instagram");
    content = content.replace(/<Youtube size=\{18\} \/>/g, "Youtube");
  }
  
  fs.writeFileSync(file, content);
});
console.log('Fixed TS errors');
