import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Map of aliases to their actual paths
const aliases = {
  '@config': join(__dirname, 'config'),
  '@controller': join(__dirname, 'src/controller'),
  '@service': join(__dirname, 'src/service'),
  '@models': join(__dirname, 'src/models'),
  '@routes': join(__dirname, 'src/routes'),
  '@middlewares': join(__dirname, 'src/middlewares'),
  '@utils': join(__dirname, 'src/utils'),
  '@mapper': join(__dirname, 'src/mapper'),
  '@repo': join(__dirname, 'src/repo'),
};

export function resolve(specifier, context, defaultResolve) {
  // Check if the specifier starts with @
  for (const [alias, path] of Object.entries(aliases)) {
    if (specifier.startsWith(alias + '/')) {
      const relativePath = specifier.substring(alias.length + 1);
      const resolvedPath = join(path, relativePath);
      return defaultResolve(resolvedPath, context);
    }
  }
  
  // If no alias matches, use default resolve
  return defaultResolve(specifier, context);
} 