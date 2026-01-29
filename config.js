import StyleDictionary from 'style-dictionary';
import { register, expandTypesMap } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

// 첫 번째 레벨(groupware-design-system 등)을 생략하는 transform
StyleDictionary.registerTransform({
  name: 'name/skip-set',
  type: 'name',
  transform: (token, options) => {
    // path에서 첫 번째 세그먼트를 제외하고 kebab-case로 조합
    const prefix = options.prefix ? `${options.prefix}-` : '';
    return prefix + token.path.slice(1).join('-');
  },
});

export default {
  source: ['figma-design-tokens.json'],
  preprocessors: ['tokens-studio'],
  expand: {
    typesMap: expandTypesMap,
  },
  log: {
    verbosity: 'verbose',
  },
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/skip-set'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: 'tokens-studio',
      transforms: ['name/skip-set'],
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
  },
};
