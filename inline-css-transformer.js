#!/usr/bin/env node

const fs = require('fs');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');
const postcssJs = require('postcss-js');

// Get the input file path from command-line arguments
const inputFilePath = process.argv[2];

if (!inputFilePath) {
  console.error('Please provide the path to the HTML file as an argument.');
  process.exit(1);
}

// Read the HTML file
const htmlContent = fs.readFileSync(inputFilePath, 'utf8');

// Parse the HTML content
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Extract and process the <style> tag
const styleElement = document.querySelector('style');
const cssContent = styleElement.textContent;

// Parse the CSS using PostCSS
const root = postcss.parse(cssContent);
const styleObject = postcssJs.objectify(root);

// Function to resolve CSS variables
const resolveCSSVariables = (style, variables) => {
  const resolvedStyle = {};
  Object.keys(style).forEach(property => {
    let value = style[property];
    if (typeof value === 'string' && value.startsWith('var(--')) {
      const variableName = value.slice(4, -1).trim();
      value = variables[variableName] || value;
    }
    resolvedStyle[property] = value;
  });
  return resolvedStyle;
};

// Extract CSS variables
const cssVariables = {};
root.walkDecls(decl => {
  if (decl.prop.startsWith('--')) {
    cssVariables[decl.prop] = decl.value;
  }
});

// Apply the styles inline
Object.keys(styleObject).forEach(selector => {
  const elements = document.querySelectorAll(selector);
  const styles = resolveCSSVariables(styleObject[selector], cssVariables);
  elements.forEach(element => {
    Object.assign(element.style, styles);
  });
});

// Remove the <style> tag
styleElement.remove();

// Serialize the modified HTML and output to the console
const outputHtml = dom.serialize();
console.log(outputHtml);
