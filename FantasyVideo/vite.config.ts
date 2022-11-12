import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig, ConfigEnv, ProxyOptions } from 'vite'
import { resolve } from 'path'
import { isProd, loadEnv } from './src/utils/vite'

// process.env.NODE_ENV === 'production'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
    const { VITE_PORT, VITE_OPEN, VITE_BASE_PATH, VITE_OUT_DIR, VITE_PROXY_URL } = loadEnv(mode)

    // alias 别名
    const alias: Record<string, string> = {
        '/@': pathResolve('./src/'),
        assets: pathResolve('./src/assets'),
    }

    let proxy: Record<string, string | ProxyOptions> = {}
    if (VITE_PROXY_URL) {
        proxy = {
            '/api': {
                target: VITE_PROXY_URL,
                changeOrigin: true,
            },
            '/public': {
                target: VITE_PROXY_URL,
                changeOrigin: true,
            },
            '/storage': {
                target: VITE_PROXY_URL,
                changeOrigin: true,
            }
        }
    }

    return {
        plugins: [react()],
        root: process.cwd(),
        resolve: { alias },
        base: VITE_BASE_PATH,
        server: {
            host: '0.0.0.0',
            // host: '43.139.126.249',
            port: VITE_PORT,
            open: VITE_OPEN,
            proxy: proxy,
        },
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            },
                        },
                    },
                ],
            },
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    charset: false,
                    modifyVars: {
                        "@font-size-base": "16px",
                        "@primary-color": "#1a7edb",
                        "@layout-header-background": "#1a7edb",
                        "@menu-highlight-color": "#000000",
                        "@menu-item-active-bg": "#1a7edb",
                    },
                }
            },
        },
    }
}

export default viteConfig

