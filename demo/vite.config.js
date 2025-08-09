import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/dd-menu/",
    server: {
        port: 3009
    },
    resolve: {
        dedupe: ["react", "react-dom"]
    }
});
