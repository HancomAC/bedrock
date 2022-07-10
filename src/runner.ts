import * as childProcess from 'child_process';
import * as path from "path";

const packageJson = require(path.join(require.main.path, 'package.json'));

const makeAllPackagesExternalPlugin = {
    name: 'make-all-packages-external',
    setup(build) {
        build.onResolve({filter: /\$[A-Za-z]+/}, () => ({external: false}))
        build.onResolve({filter: /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/}, args => ({path: args.path, external: true}))
    },
}

const args = require('args-parser')(process.argv);

let builded;

require('esbuild').build({
    entryPoints: [path.join(require.main.path, args.entry)],
    outfile: path.join(require.main.path, args.dist),
    bundle: true,
    plugins: [makeAllPackagesExternalPlugin],
    platform: 'node',
    define: {
        'config.version': `"${packageJson.version}"`,
        'config.commitHash': `"${childProcess.execSync('git rev-parse HEAD', {cwd: require.main.path}).toString().trim()}"`,
        'config.commitCount': `${childProcess.execSync('git rev-list --count HEAD', {cwd: require.main.path}).toString().trim()}`,
        'config.buildDate': `"${new Date().toISOString()}"`,
        'config.port': args.dev ? '3006' : '80',
        'config.dev': `${args.dev}`,
    },
    ...(args.dev ? {
        watch: {
            onRebuild(error) {
                if (error) console.error('⚠ watch build failed:', error)
                else {
                    for (let i = 0; i < process.stdout.rows; i++) console.log('');
                    process.stdout.cursorTo(0, 0);
                    console.log('✔ Build successful.')
                    console.log('⚡ Restarting server...')
                    if (builded) builded.kill();
                    builded = childProcess.spawn('node', [path.join(require.main.path, args.dist)], {stdio: 'inherit'});
                }
            },
        }
    } : {}),
}).then(() => {
    if (args.dev) {
        for (let i = 0; i < process.stdout.rows; i++) console.log('');
        process.stdout.cursorTo(0, 0);
        console.log('⚡ Starting server...')
        builded = childProcess.spawn('node', [path.join(require.main.path, args.dist)], {stdio: 'inherit'});
    } else {
        console.log('✔ Build successful.')
    }
})
