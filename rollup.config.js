import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
const babel = require('rollup-plugin-babel');

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'dist/bundle.js',
		format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		bundle(),
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		production && uglify() // minify, but only in production
	]
};