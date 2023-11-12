import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	base: "web",
	build: {
		outDir: "docs",
	},
	plugins: [vue(), tsconfigPaths()],
	resolve: {
		alias: [{ find: "@this", replacement: "/src" }],
	},
});
