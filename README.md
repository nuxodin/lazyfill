# 💊 lazyfill

Polyfill Service - the lazy way


Polyfills **are loaded on demand**, only when they are needed 😲  
Initial **2Kb** to polyfill a lot of Stuff.  

# Ussage

Add this script on the top of your page:
```html
<script src="https://cdn.jsdelivr.net/gh/nuxodin/lazyfill@1.2.0/mod.min.js"></script>
```
**done!**

# Polyfills

(Anything missing? Any suggestions?)

<ul><li>Window<ul><li>fetch
<li>Promise
<li>IntersectionObserver
<li>ResizeObserver
<li>AbortController
<li>URLSearchParams
<li>customElements
<li>requestIdleCallback
<li>cancelIdleCallback
<li>WeakSet
</ul><li>Intl.DateTimeFormat<ul><li>formatToParts
</ul><li>Intl<ul><li>DisplayNames
<li>ListFormat
<li>Locale
<li>PluralRules
<li>RelativeTimeFormat
<li>getCanonicalLocales
</ul><li>Element<ul><li>matches
<li>closest
<li>prepend
<li>append
<li>before
<li>after
<li>replaceWidth
<li>remove
<li>blur
<li>focus
<li>classList
<li>getElementsByClassName
<li>children
<li>toggleAttribute
</ul><li>Array<ul><li>from
<li>of
<li>at
<li>copyWithin
<li>entries
<li>fill
<li>find
<li>findIndex
<li>findLast
<li>findLastIndex
<li>flat
<li>flatMap
<li>includes
<li>keys
<li>values
</ul><li>CSS<ul><li>escape
<li>supports
</ul><li>HTMLDocument<ul><li>currentScript
<li>caretRangeFromPoint
</ul><li>Node<ul><li>contains
<li>isConnected
</ul><li>HTMLFormElement<ul><li>reportValidity
<li>requestSubmit
</ul><li>HTMLInputElement<ul><li>reportValidity
</ul><li>Math<ul><li>trunc
<li>sign
</ul><li>Number<ul><li>isInteger
</ul><li>Object<ul><li>assign
<li>entries
<li>fromEntries
<li>is
<li>values
<li>hasOwn
</ul><li>Promise<ul><li>allSettled
<li>any
</ul><li>RegExp<ul><li>flags
</ul><li>String<ul><li>fromCodePoint
<li>at
<li>codePointAt
<li>endsWith
<li>includes
<li>padEnd
<li>padStart
<li>repeat
<li>startsWith
<li>replaceAll
</ul><li>SVGStyleElement<ul><li>sheet
</ul><li>Crypto<ul><li>randomUUID
</ul></ul>

# How it works

To every polyfillable property, the scripts adds a getter which synchronously loads the corresponding polyfill.  
Of course, we all know that blocking xhr-requests is not nice.  
Therefore, the url to the script that should be added to the page is given in the console.

Let's assume that your browser does not support the function "String.prototype.at".
```js
> ['a','b','c'].at(-1); // accessing  [].at immediately loads the polyfill
> 'c'
```


# Help
Any help is greatly appreciated.

# Thanks / Resources

https://github.com/behnammodi/polyfill

https://polyfill.io/v3/

https://ungap.github.io/

https://github.com/Sylvain59650/all-polyfills

https://vanillajstoolkit.com/polyfills/
