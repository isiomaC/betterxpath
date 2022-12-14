// vite.config.js
import { defineConfig } from "file:///Users/chuck/Developer/NodeJs-projects/better-xpath/node_modules/vite/dist/node/index.js";
import react from "file:///Users/chuck/Developer/NodeJs-projects/better-xpath/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        contentScript: "/src/scripts/content-scripts/contentScript.js",
        chromeChangeBg: "/src/scripts/content-scripts/chromeChangeBg.js",
        index: "./index.html",
        testCss: "/src/scripts/testCss.css",
        background: "/src/scripts/service-worker/background.js"
      }
    }
  },
  server: {}
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2h1Y2svRGV2ZWxvcGVyL05vZGVKcy1wcm9qZWN0cy9iZXR0ZXIteHBhdGhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jaHVjay9EZXZlbG9wZXIvTm9kZUpzLXByb2plY3RzL2JldHRlci14cGF0aC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2h1Y2svRGV2ZWxvcGVyL05vZGVKcy1wcm9qZWN0cy9iZXR0ZXIteHBhdGgvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBidWlsZDoge1xuXG4gICAgLy8gZ2VuZXJhdGUgbWFuaWZlc3QuanNvbiBpbiBvdXREaXJcbiAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG5cbiAgICAgIC8vIGxpc3Qgb3V0IGFsbCBmaWxlcyB5b3Ugd2FudCBpbiBwcm9kdWN0aW9uIC0tLS0tLSAgXCJkZWZhdWx0IC5odG1sIGVudHJ5XCJcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIFxuICAgICAgICAvLyB0cmFja01vdXNlOiAnL3NyYy9zY3JpcHRzL2NvbnRlbnQtc2NyaXB0cy90cmFja01vdXNlLmpzJywgXG4gICAgICAgIGNvbnRlbnRTY3JpcHQ6ICcvc3JjL3NjcmlwdHMvY29udGVudC1zY3JpcHRzL2NvbnRlbnRTY3JpcHQuanMnLCAvL2Nocm9tZSBzY3JpcHQgdG8gbWFuaXB1bGF0ZSBwYWdlIFx1MjAzQ1x1RkUwRlxuICAgICAgICBjaHJvbWVDaGFuZ2VCZzogJy9zcmMvc2NyaXB0cy9jb250ZW50LXNjcmlwdHMvY2hyb21lQ2hhbmdlQmcuanMnLCAvL2Nocm9tZSBzY3JpcHQgdG8gbWFuaXB1bGF0ZSBwYWdlIFx1MjAzQ1x1RkUwRlxuXG4gICAgICAgIGluZGV4OiAnLi9pbmRleC5odG1sJywgIC8vaHRtbCB0byBzZXQgaW4gbWFuaWZlcy50anNvblxuICAgICAgICB0ZXN0Q3NzOiAnL3NyYy9zY3JpcHRzL3Rlc3RDc3MuY3NzJyxcblxuICAgICAgICBiYWNrZ3JvdW5kOiAnL3NyYy9zY3JpcHRzL3NlcnZpY2Utd29ya2VyL2JhY2tncm91bmQuanMnLFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgLy8gb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDo1MTczLycgLy8gJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MCdcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlUsU0FBUyxvQkFBb0I7QUFDeFcsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFHTCxVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsTUFHYixPQUFPO0FBQUEsUUFHTCxlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUVoQixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFFVCxZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRLENBRVI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
