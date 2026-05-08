const fs = require('fs');

const addImport = (file, imp) => {
  let content = fs.readFileSync(file, 'utf8');
  content = imp + '\n' + content;
  fs.writeFileSync(file, content);
};

addImport('./client/src/components/layout/Navbar.tsx', "import { useState, useEffect } from 'react';");
addImport('./client/src/pages/Login.tsx', "import { useState } from 'react';");
addImport('./client/src/pages/ProductDetails.tsx', "import { useState } from 'react';");
addImport('./client/src/pages/Shop.tsx', "import { useState } from 'react';");
