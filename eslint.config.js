import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'vite.config.ts',
			'postcss.config.js'
		]
	},
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react: reactPlugin,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': 'off',
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' }
			],
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off'
		}
	}
]
