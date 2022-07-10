import './util/env';
export default function ({ port, name, cb }?: {
    port: number;
    name: string;
    cb: ({}: any) => Promise<void>;
}): Promise<void>;
