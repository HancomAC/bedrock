declare global {
    namespace Express {
        interface Request {
            auth?: any;
            ip: string;
        }
    }
}

export {};
