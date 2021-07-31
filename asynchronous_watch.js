const { watch } = require('fs/promises');

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);
file = '/Users/regismartin/dev/node_snippets/toto.md'
console.log(file);

(async () => {
    try {
        const watcher = watch(file, { signal });
        for await (const event of watcher)
        console.log(event);
    } catch (err) {
        if (err.name === 'AbortError');
        return;
        throw err;
    }
})();
