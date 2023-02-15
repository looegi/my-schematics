import { Rule, SchematicContext, Tree, apply, applyTemplates, chain, mergeWith, move, url } from '@angular-devkit/schematics';
import { Schema } from './schema'
import { normalize, strings } from '@angular-devkit/core';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function tailwindContainer(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    
    _options.path = _options.path ?? normalize('src/app/' + _options.name as string);

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name
      }),
      move(normalize(_options.path as string))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}