/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import path from 'path'
import { defineConfig, withFilter } from 'vite'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isAuditMode = mode === 'audit'

	return {
		plugins: [
			react(),
			tailwindcss(),
			withFilter(
				svgr({
					/*...*/
				}),
				{ load: { id: /\.svg\?react$/ } }
			)
		],
		test: { environment: 'happy-dom' },
		server: isAuditMode ? { hmr: false } : undefined,
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		build: {
			rolldownOptions: {
				output: {
					advancedChunks: {
						groups: [{ name: 'vendor', test: /\/react(?:-dom)?/ }]
					}
				},
				input: {
					main: resolve(import.meta.dirname, 'index.html')
				}
			}
		},
		optimizeDeps: {
			include: ['react/jsx-runtime']
		}
	}
})
