const { builtinModules } = require('module');

module.exports = {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/gql-query-creator.cjs',
			format: 'cjs',
			preferConst: true,
		},
		{
			file: 'dist/gql-query-creator.mjs',
			format: 'esm',
			preferConst: true,
		},
	],
	external: [...builtinModules],
};
