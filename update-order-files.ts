#!/usr/bin/env bun

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import * as yaml from 'yaml';

// The base directory to start searching from
const baseDir = './reference';

// Function to find all _order.yaml files recursively
function findOrderFiles(dir: string): string[] {
  const orderFiles: string[] = [];
  
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // If it's a directory, recurse into it
      orderFiles.push(...findOrderFiles(filePath));
    } else if (file === '_order.yaml') {
      // If it's an _order.yaml file, add it to the list
      orderFiles.push(filePath);
    }
  }
  
  return orderFiles;
}

// Function to get all .md files in a directory
function getMdFilesInDir(dir: string): string[] {
  return readdirSync(dir)
    .filter(file => file.endsWith('.md') && file !== '_order.yaml')
    .sort();
}

// Function to extract refs from original yaml entries
function extractRefsFromYaml(parsedYaml: any): string[] {
  const refs: string[] = [];
  
  if (!Array.isArray(parsedYaml)) {
    return refs;
  }
  
  for (const item of parsedYaml) {
    if (typeof item === 'string') {
      // Simple entry - just add to refs
      continue;
    } else if (typeof item === 'object') {
      // Complex entry with title and ref
      for (const key in item) {
        const value = item[key];
        if (typeof value === 'object' && value.ref) {
          refs.push(value.ref);
        }
      }
    }
  }
  
  return refs;
}

// Function to try to extract filenames from titles and refs
function extractFilenamesFromContent(content: string, dirPath: string): string[] {
  const allMdFiles = getMdFilesInDir(dirPath);
  const extractedFilenames: string[] = [];
  const seenFilenames = new Set<string>();
  
  try {
    // Try to parse the YAML
    const parsed = yaml.parse(content);
    
    if (Array.isArray(parsed)) {
      // Look for ref: entries
      for (const item of parsed) {
        if (typeof item === 'object') {
          for (const key in item) {
            if (typeof item[key] === 'object' && item[key].ref) {
              // Found a ref entry
              const ref = item[key].ref;
              const matchingFile = allMdFiles.find(file => file.startsWith(ref));
              if (matchingFile && !seenFilenames.has(matchingFile)) {
                extractedFilenames.push(matchingFile);
                seenFilenames.add(matchingFile);
              }
            }
          }
        } else if (typeof item === 'string') {
          // Try to match from title
          const title = item.trim().toLowerCase().replace(/\s+/g, '');
          
          // Look for a matching file based on the title
          const matchingFile = allMdFiles.find(file => {
            const fileWithoutExt = file.replace('.md', '').toLowerCase();
            return fileWithoutExt.includes(title) || title.includes(fileWithoutExt);
          });
          
          if (matchingFile && !seenFilenames.has(matchingFile)) {
            extractedFilenames.push(matchingFile);
            seenFilenames.add(matchingFile);
          }
        }
      }
    }
  } catch (e) {
    console.error(`  Error parsing YAML content:`, e);
  }
  
  // Add any remaining files that weren't matched
  for (const file of allMdFiles) {
    if (!seenFilenames.has(file)) {
      extractedFilenames.push(file);
      seenFilenames.add(file);
    }
  }
  
  return extractedFilenames;
}

// Function to process an _order.yaml file
function processOrderFile(filePath: string): void {
  console.log(`Processing: ${filePath}`);
  
  try {
    // Get the directory containing the _order.yaml file
    const dir = dirname(filePath);
    
    // Get all .md files in the directory
    const mdFiles = getMdFilesInDir(dir);
    
    // If there are no .md files, don't process this _order.yaml
    if (mdFiles.length === 0) {
      console.log(`  No .md files found in ${dir}`);
      return;
    }
    
    // Read the current _order.yaml file
    const content = readFileSync(filePath, 'utf8');
    
    // Try to extract filenames from the original content to preserve order
    const orderedFilenames = extractFilenamesFromContent(content, dir);
    
    // Create a new list with just the filenames
    const newContent = orderedFilenames.map(file => `- ${file}`).join('\n');
    
    // Write the new content back to the file
    writeFileSync(filePath, newContent + '\n', 'utf8');
    console.log(`  Updated ${filePath} with ${orderedFilenames.length} entries`);
  } catch (e) {
    console.error(`  Error processing ${filePath}:`, e);
  }
}

// Main function
function main() {
  // Find all _order.yaml files
  const orderFiles = findOrderFiles(baseDir);
  console.log(`Found ${orderFiles.length} _order.yaml files`);
  
  // Process each file
  for (const file of orderFiles) {
    processOrderFile(file);
  }
  
  console.log('Done!');
}

// Run the main function
main(); 