module.exports = function (plop) {
  // 컴포넌트 타입 정의
  const componentTypes = {
    COMPONENTS: {
      foundation: 'src/components/foundation',
      layout: 'src/components/layout',
      navigation: 'src/components/navigation',
      'data-display': 'src/components/data-display',
      forms: 'src/components/forms',
      buttons: 'src/components/buttons',
      overlays: 'src/components/overlays',
      patterns: 'src/components/patterns',
      actions: 'src/components/actions',
      feedback: 'src/components/feedback',
    },
    UTILS: {
      'utils/style': 'src/utils/style',
      'utils/common': 'src/utils/common',
      'utils/hooks': 'src/utils/hooks',
    },
    THEMES: {
      themes: 'src/styles/themes',
    },
  };

  plop.setGenerator('component', {
    description: '컴포넌트 생성',
    prompts: [
      {
        type: 'list',
        name: 'category',
        message: '카테고리를 선택하세요:',
        choices: ['COMPONENTS', 'UTILS', 'THEMES'],
      },
      {
        type: 'list',
        name: 'type',
        message: '타입을 선택하세요:',
        choices: answers => Object.keys(componentTypes[answers.category]),
      },
      {
        type: 'input',
        name: 'name',
        message: '이름을 입력하세요:',
        validate: value => {
          if (/.+/.test(value)) {
            return true;
          }
          return '이름은 필수 입력값입니다.';
        },
      },
    ],
    actions: data => {
      const actions = [];
      const basePath = componentTypes[data.category][data.type];

      switch (data.category) {
        case 'COMPONENTS':
          actions.push({
            type: 'addMany',
            destination: `${basePath}/{{pascalCase name}}`,
            templateFiles: 'plop-templates/component/*.hbs',
            base: 'plop-templates/component',
          });
          break;

        case 'UTILS':
          if (data.type.includes('hooks')) {
            actions.push({
              type: 'addMany',
              destination: `${basePath}/{{camelCase name}}`,
              templateFiles: 'plop-templates/util/hook/*.hbs',
              base: 'plop-templates/util/hook',
            });
          } else {
            actions.push({
              type: 'addMany',
              destination: `${basePath}/{{camelCase name}}`,
              templateFiles: 'plop-templates/util/*.hbs',
              base: 'plop-templates/util',
            });
          }
          break;

        case 'THEMES':
          actions.push({
            type: 'addMany',
            destination: `${basePath}/{{camelCase name}}`,
            templateFiles: 'plop-templates/theme/*.hbs',
            base: 'plop-templates/theme',
          });
          break;
      }

      return actions;
    },
  });
};
