declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string,
            PG_HOST?: string,
            PG_PORT?: string,
            PG_USER?: string,
            PG_PASS?: string,
            PG_DATABASE?: string,
        }
    }
}

export { };
