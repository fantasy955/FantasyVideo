import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig, ConfigEnv, ProxyOptions } from 'vite'
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
const viteConfig = ({ mode }: ConfigEnv): UserConfig => {

    // alias 别名
    const alias: Record<string, string> = {
        '/@': pathResolve('./src/'),
        assets: pathResolve('./src/assets'),
    }

    return {
        plugins: [react()],
        root: process.cwd(),
        resolve: { alias },
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
                        "@layout-header-background": "#1a7edb",
                    },
                }
            },
        },
    }
}

export default viteConfig

