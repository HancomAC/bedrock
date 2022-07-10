const childProcess = require('child_process');
const packageJson = require('./package.json');
const path = require('path');
const {execSync} = require("child_process");

const typePlugin = {
    name: 'TypeScriptDeclarationsPlugin',
    setup(build) {
        build.onEnd((result) => {
            if (result.errors.length > 0) return
            childProcess.execSync('tsc --emitDeclarationOnly')
        })
    }
}

const makeAllPackagesExternalPlugin = {
    name: 'make-all-packages-external',
    setup(build) {
        build.onResolve({filter: /\$[A-Za-z]+/}, () => ({external: false}))
        build.onResolve({filter: /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/}, args => ({path: args.path, external: true}))
    },
}

const args = require('args-parser')(process.argv);

let builded;

execSync('tsc')
require('esbuild').build({
    entryPoints: ['./src/runner.ts'],
    outfile: 'build/runner.js',
    bundle: true,
    plugins: [makeAllPackagesExternalPlugin],
    platform: 'node',
}).then(() => {
    console.log('✔ Build successful.')
})
