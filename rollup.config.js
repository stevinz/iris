export default [

	{
		input: './src/Iris.js',
		treeshake: false,

		output: {

			format: 'esm',
			file: './build/iris.module.js',
			sourcemap: false,

		},
	}

];