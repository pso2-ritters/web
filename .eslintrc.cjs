module.exports = {
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:vue/vue3-recommended",
		"prettier",
	],
	rules: {
		camelcase: "error",
		curly: "error",
		eqeqeq: "error",
		"object-shorthand": "error",
		"import/no-unresolved": "off",
		"import/order": [
			"error",
			{
				alphabetize: { order: "asc", caseInsensitive: true },
				pathGroups: [{ pattern: "@this/**", group: "external", position: "after" }],
				pathGroupsExcludedImportTypes: ["builtin"],
				groups: ["type", "object", "builtin", "external", "internal", "parent", "sibling", "index"],
				"newlines-between": "always",
			},
		],
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{ allowExpressions: true, allowTypedFunctionExpressions: true },
		],
		"@typescript-eslint/explicit-member-accessibility": "error",
		"@typescript-eslint/no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
		"@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false }],
	},
	ignorePatterns: ["docs"],
};
