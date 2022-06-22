
if (!CSS.registerProperty) {
    const pool = new Set();
    CSS.registerProperty = function(def){
        if (pool.has(def.name)) throw new Error(`property ${def.name} already registered`);
        pool.add(def.name);

        if (def.syntax!=null && def.syntax !== '*') console.log('CSS.registerProperty: syntax not supported in your browser');

        let hasWhere = CSS.supports('selector(:where(x))');
        let where = selector => hasWhere?`:where(${selector})`:selector;

        let style = '';
        if (def.initialValue != null) {
            style += where('html')+` { ${def.name}:${def.initialValue}; }`;
        }
        if (!def.inherits) { // if not inherited and no initial value, it inherits anyway, but the native chrome behavoir is the same!
            style += where('*,::before,::after') + ` { ${def.name}:${def.initialValue??''}; }`;
        }
        document.head.insertAdjacentHTML('afterbegin', `<style>${style}</style>`);
    }
}

/*
note:
definition.syntax is not supported
*/

/* test:
<script>
CSS.registerProperty({
    name: '--my-color',
    syntax: '*',
    inherits: false,
    initialValue: 'blue',
});
</script>

<style>
article {
    --my-color:red;
}
article, h2 {
    color: var(--my-color);
}
</style>

<article>
    This article has the style color:var(--my-color) and --my-color is defined as red.
    <h2>For H2, the style color:var(--my-color) is applyed, but as --my-color does not inherit, it gets the initialValue (blue)</h2>
</article>
*/
