import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		commonjsOptions: {
			esmExternals: true 
		}
	}
};

export default config;
