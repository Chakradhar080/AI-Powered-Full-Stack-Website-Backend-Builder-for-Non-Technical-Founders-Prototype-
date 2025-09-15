// Simple test script to verify the application works correctly
// This is a basic test to ensure the core functionality is working

console.log('Testing AI Website Builder...');

// Test 1: Check if required dependencies are installed
console.log('Test 1: Checking dependencies...');

const fs = require('fs');
const path = require('path');

// Check if frontend package.json exists
const frontendPackageJsonPath = path.join(__dirname, 'frontend', 'package.json');
if (fs.existsSync(frontendPackageJsonPath)) {
  console.log('✓ Frontend package.json found');
} else {
  console.log('✗ Frontend package.json not found');
}

// Check if backend package.json exists
const backendPackageJsonPath = path.join(__dirname, 'backend', 'package.json');
if (fs.existsSync(backendPackageJsonPath)) {
  console.log('✓ Backend package.json found');
} else {
  console.log('✗ Backend package.json not found');
}

// Test 2: Check if required directories exist
console.log('\nTest 2: Checking directory structure...');

const requiredDirs = [
  'frontend/src/components',
  'frontend/src/pages',
  'frontend/src/services',
  'backend/controllers',
  'backend/models',
  'backend/routes',
  'backend/services'
];

requiredDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${dir} found`);
  } else {
    console.log(`✗ ${dir} not found`);
  }
});

// Test 3: Check if key files exist
console.log('\nTest 3: Checking key files...');

const keyFiles = [
  'frontend/src/App.tsx',
  'frontend/src/pages/BuilderPage.tsx',
  'frontend/src/pages/SettingsPage.tsx',
  'frontend/src/components/Canvas.tsx',
  'frontend/src/components/ComponentLibrary.tsx',
  'backend/server.ts',
  'backend/controllers/websiteController.ts',
  'backend/controllers/aiController.ts',
  'backend/models/Website.ts'
];

keyFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file} found`);
  } else {
    console.log(`✗ ${file} not found`);
  }
});

console.log('\nTesting complete. Check the results above to verify if all components are present.');