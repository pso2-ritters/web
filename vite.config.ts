import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	base: "web",
	build: {
		outDir: "docs",
	},
	plugins: [
		vue(),
		tsconfigPaths(),
		AutoImport({
			imports: ["vitest"],
			dts: "./src/helpers/auto-imports.d.ts",
		}),
	],
	resolve: {
		alias: [{ find: "@this", replacement: "/src" }],
	},
});
