/* eslint-disable max-lines */

module.exports = {
  env: {
    browser: true, // Browser global variables like `window` etc.
    commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
    es6: true, // Enable all ECMAScript 6 features except for modules.
    jest: true, // Jest global variables like `it` etc.
    node: true // Defines things like process.env when generating through node
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react"
  ],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
      },
      plugins: [
        "@typescript-eslint"
      ],
      // You can add Typescript specific rules here.
      // If you are adding the typescript variant of a rule which is there in the javascript
      // ruleset, disable the JS one.
      rules: {
        "@typescript-eslint/member-delimiter-style": [
          "warn",
          {
            "multiline": {
              "delimiter": "semi",
              "requireLast": true
            },
            "singleline": {
              "delimiter": "semi",
              "requireLast": false
            }
          }
        ],
        "@typescript-eslint/no-array-constructor": "warn",
        "@typescript-eslint/no-unused-vars": ["error"],
        "no-array-constructor": "off",
        "no-unused-vars": "off"
      }
    }
  ],
  parser: "babel-eslint", // Uses babel-eslint transforms.
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  plugins: [
    "import" // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
  ],
  root: true, // For configuration cascading.
  rules: {
    "comma-dangle": [
      "warn",
      "never"
    ],
    "eol-last": "error",
    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc"
        },
        groups: [
          "builtin",
          "external",
          "index",
          "sibling",
          "parent",
          "internal"
        ]
      }
    ],
    indent: [
      "error",
      2
    ],
    "jsx-quotes": [
      "warn",
      "prefer-double"
    ],
    "keyword-spacing": "warn",
    "max-len": [
      "warn",
      {
        code: 120
      }
    ],
    "max-lines": ["warn", 90],
    // "no-console": "warn",
    "no-duplicate-imports": "warn",
    "no-multi-spaces": "warn",
    "no-multiple-empty-lines": ["warn", { max: 1 }],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            message: "Please use import foo from 'lodash-es/foo' instead.",
            name: "lodash"
          },
          {
            message: "Avoid using chain since it is non tree-shakable. Try out flow instead.",
            name: "lodash-es/chain"
          },
          {
            importNames: ["chain"],
            message: "Avoid using chain since it is non tree-shakable. Try out flow instead.",
            name: "lodash-es"
          },
          {
            message: "Please use import foo from 'lodash-es/foo' instead.",
            name: "lodash-es"
          }
        ],
        patterns: [
          "lodash/**",
          "lodash/fp/**"
        ]
      }
    ],
    "no-trailing-spaces": "warn",
    "no-unused-vars": "warn",
    "object-curly-spacing": [
      "warn",
      "always"
    ],
    quotes: [
      "warn",
      "double"
    ],
    "react/jsx-curly-spacing": [
      "warn",
      {
        allowMultiline: true,
        children: {
          when: "always"
        },
        spacing: {
          objectLiterals: "always"
        },
        when: "always"
      }
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    ],
    "react/jsx-indent": [
      "error",
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions:
          true
      }
    ],
    "react/jsx-indent-props": [
      "error",
      2
    ],
    "react/prop-types": "warn",
    semi: "warn",
    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false
      }
    ],
    "sort-keys": [
      "warn",
      "asc",
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false
      }
    ]
  },
  settings: {
    react: {
      version: "detect" // Detect react version
    }
  }
};
