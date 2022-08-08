const childProcess = require('child_process');
const packageJson = require('./package.json');
const path = require('path');
const fs = require("fs");
const args = require('args-parser')(process.argv);

const makeAllPackagesExternalPlugin = {
    name: 'make-all-packages-external',
    setup(build) {
        build.onResolve({ filter: /[A-Z]:\/*/ }, async () => ({ external: false }));
        build.onResolve({ filter: /\$\/*/ }, async () => ({ external: false }));
        build.onResolve({filter: /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/}, args => ({path: args.path, external: true}))
    },
}

const config = JSON.stringify({
    'version': packageJson.version,
    'commitHash': childProcess.execSync('git rev-parse HEAD', {cwd: process.cwd()}).toString().trim(),
    'commitCount': parseInt(childProcess.execSync('git rev-list --count HEAD', {cwd: process.cwd()}).toString().trim()),
    'buildDate': new Date().toISOString(),
    'port': args.port || (args.dev ? 3006 : 80),
    'dev': args.dev,
})

const typePlugin = {
    name: 'TypeScriptDeclarationsPlugin',
    setup(build) {
        build.onEnd((result) => {
            if (result.errors.length > 0) return
            fs.writeSync('src/module/config.ts', `export default ${config}`)
            childProcess.execSync('tsc')
        })
    }
}

let builded;

function copyFolderSync(from, to) {
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

fs.writeFileSync('src/module/config.ts', `export default ${config}`)
childProcess.execSync('tsc')
try {
    fs.rmdirSync('gcp', {recursive: true})
} catch (e) {
}
copyFolderSync('build/module/gcp', 'gcp')

require('esbuild').build({
    entryPoints: ['./src/runner.ts'],
    outfile: 'build/runner.js',
    bundle: true,
    plugins: [makeAllPackagesExternalPlugin],
    platform: 'node',
}).then(() => {
    console.log('✔ Build successful.')
})
