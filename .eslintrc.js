module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
		{
			'env': {
				'node': true,
				'jest': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		// Agrega tus reglas específicas de ESLint aquí si es necesario
		'no-console': 'off', // Desactiva el error por console.log
		'no-alert': 'off',   // Desactiva el error por alert
		'brace-style': ['error', '1tbs', { 'allowSingleLine': true }]
	}
};
