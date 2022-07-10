import './util/env';
export default function ({ port, name, cb, config }?: {
    port: number;
    name: string;
    config: any;
    cb: ({}: any) => Promise<void>;
}): Promise<void>;
