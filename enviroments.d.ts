declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT?: string,

            PG_HOST?: string,
            PG_PORT?: string,
            PG_USER?: string,
            PG_PASS?: string,
            PG_DATABASE?: string,

            EMAIL_USER?: string,
            EMAIL_PASSWORD?: string,
        }
    }
}

export { };
