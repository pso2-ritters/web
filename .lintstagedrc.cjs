module.exports = {
	"*.{js,cjs,ts,vue}": ["eslint --fix", "prettier --write"],
	"*.{json,md,scss,yml}": ["prettier --write"],
	"package.json": "sort-package-json",
};
