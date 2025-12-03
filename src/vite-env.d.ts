/// <reference types="vite/client" />


export interface ViteTypeOptions {
}

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL_LOCAL: string
    readonly VITE_API_BASE_URL_DEPLOY: string
    readonly MODE: "development" | "production" | "test"

}


export interface ImportMeta {
    readonly env: ImportMetaEnv
}