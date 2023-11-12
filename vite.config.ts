import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "web",
	build: {
		outDir: "docs",
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ["vitest"],
			dts: "./src/helpers/auto-imports.d.ts",
		}),
	],
});
