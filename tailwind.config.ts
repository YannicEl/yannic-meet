import { defineConfig } from 'vite-plugin-windicss';
import formsPlugin from 'windicss/plugin/forms';

export default defineConfig({
	darkMode: 'class',
	theme: {
		container: {
			center: true,
		},
		extend: {},
	},
	plugins: [formsPlugin],
});
