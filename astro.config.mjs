// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://bhardwajarun.com',

	output: 'static',

	integrations: [mdx(), sitemap()],

	markdown: {
		shikiConfig: {
			theme: 'github-dark',
		},
	},

	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Space Grotesk',
			cssVariable: '--font-heading',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600, 700],
		},
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-body',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			fallbacks: ['monospace'],
			weights: [400, 500],
		},
	],

	vite: {
		plugins: [tailwindcss()],
	},
});