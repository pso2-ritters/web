import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/web",
	build: {
		outDir: "docs",
	},
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		vuetify({ autoImport: true, styles: "sass" }),
		tsconfigPaths(),
	],
	resolve: {
		alias: [{ find: "@this", replacement: "/src" }],
	},
});
