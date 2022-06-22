import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import cssnano from 'cssnano'

const plugins = [postcssPresetEnv({ stage: 1 }), autoprefixer]

if (process.env.NODE_ENV !== 'development') {
	plugins.push(cssnano({ preset: 'default' }))
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: { plugins },
  }),
	kit: {
		adapter: adapter(),
	}
};

export default config;
