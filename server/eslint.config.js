import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 0,
      'react/display-name': 0,

      'no-console': 1, //Không console.log trong dự án
      'no-lonely-if': 1, //If phải có else, không được đứng rời
      'no-unused-vars': 1, //Biến không sử dụng thì phải xóa đi
      'no-trailing-spaces': 1, //Thừa nhiều khoảng trắng ở cuối dòng code
      'no-multi-spaces': 1, //Thừa nhiều khoảng trắng ở trong code (VD: a   <   b)
      'no-multiple-empty-lines': 1, //Thừa nhiều enter line
      'space-before-blocks': ['error', 'always'], //Trước các khối code sẽ phải có khoảng trắng
      'object-curly-spacing': [1, 'always'],
      indent: ['warn', 2], //Khoảng cách khi tab là 2
      //'semi': [1, 'never'], //Không có dấu ;
      //'quotes': ['warn', 'single'], //Dùng nháy đơn thay vì nháy kép cho BIẾN kiểu chuỗi
      'array-bracket-spacing': 1, //Không thừa khoảng trắng trong khai báo array
      'linebreak-style': 0,
      'no-unexpected-multiline': 'warn',
      'keyword-spacing': 1,
      'comma-dangle': 1, //Dư dấu phẩy ở cuối dòng code
      'comma-spacing': 1, //Dư khoảng trắng trước dấu phẩy (VD: var a = 5 , var b = 6)
      'arrow-spacing': 1
    }
  }
]
