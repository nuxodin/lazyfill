# 💊 lazyfill

Polyfill Service - the lazy way


Polyfills **are loaded on demand**, only when they are needed 😲  
Initial **3Kb** to polyfill a lot of Stuff!  

# Ussage

Add this script on the top of your page:
```html
<script src="https://cdn.jsdelivr.net/gh/nuxodin/lazyfill@1.7.6/mod.min.js"></script>
```
**done!**

# Polyfills

(Anything missing? Any suggestions?)



<ul>
   <li>Window
   <ul>
      <li>cookieStore
      <li>fetch
      <li>Promise
      <li>IntersectionObserver
      <li>ResizeObserver
      <li>AbortController
      <li>URLSearchParams
      <li>Temporal
      <li>temporal
      <li>customElements
      <li>structuredClone
      <li>URLPattern
      <li>ReadableStream
      <li>Sanitizer
      <li>requestIdleCallback
      <li>cancelIdleCallback
      <li>WeakSet
   </ul>
   <li>Element
   <ul>
      <li>setHTML
      <li>matches
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
      <li>isVisible
      <li>scrollIntoViewIfNeeded
   </ul>
   <li>TypedArray
   <ul>
      <li>toReversed
      <li>toSorted
      <li>with
   </ul>
   <li>Array
   <ul>
      <li>toReversed
      <li>toSorted
      <li>with
      <li>toSpliced
      <li>from
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
   </ul>
   <li>Intl.DateTimeFormat
   <ul>
      <li>formatToParts
   </ul>
   <li>Intl
   <ul>
      <li>DisplayNames
      <li>ListFormat
      <li>Locale
      <li>PluralRules
      <li>RelativeTimeFormat
      <li>getCanonicalLocales
   </ul>
   <li>CSS
   <ul>
      <li>escape
      <li>registerProperty
      <li>supports
   </ul>
   <li>HTMLDocument
   <ul>
      <li>currentScript
      <li>caretRangeFromPoint
   </ul>
   <li>Node
   <ul>
      <li>contains
      <li>isConnected
   </ul>
   <li>HTMLElement
   <ul>
      <li>inert
   </ul>
   <li>HTMLFormElement
   <ul>
      <li>reportValidity
      <li>requestSubmit
   </ul>
   <li>HTMLInputElement
   <ul>
      <li>reportValidity
   </ul>
   <li>HTMLSlotElement
   <ul>
      <li>assignedElements
   </ul>
   <li>Math
   <ul>
      <li>trunc
      <li>sign
   </ul>
   <li>Navigator
   <ul>
      <li>share
   </ul>
   <li>Number
   <ul>
      <li>isInteger
   </ul>
   <li>Object
   <ul>
      <li>assign
      <li>entries
      <li>fromEntries
      <li>is
      <li>values
      <li>hasOwn
   </ul>
   <li>Promise
   <ul>
      <li>allSettled
      <li>any
   </ul>
   <li>RegExp
   <ul>
      <li>flags
   </ul>
   <li>String
   <ul>
      <li>fromCodePoint
      <li>at
      <li>codePointAt
      <li>endsWith
      <li>includes
      <li>padEnd
      <li>padStart
      <li>repeat
      <li>startsWith
      <li>replaceAll
   </ul>
   <li>SubmitEvent
   <ul>
      <li>submitter
   </ul>
   <li>SVGStyleElement
   <ul>
      <li>sheet
   </ul>
   <li>Crypto
   <ul>
      <li>randomUUID
   </ul>
</ul>

<ul>
   <li>addEventListener signal options
   <li>focus options
   <li>classList force toggle 
   <li>Element.contains(TextNode) bug
</ul>


# How it works

To every polyfillable property, the scripts adds a getter which **synchronously** loads the corresponding polyfill.  
Of course, we all know that blocking xhr-requests is not nice.  
Therefore, the url to the script that should be added to the page is given in the console.
Ideal for prototyping.

Let's assume that your browser does not support the function "String.prototype.at".
```js
> ['a','b','c'].at(-1); // accessing  [].at immediately loads the polyfill
> 'c'
```


# Help
Any help is greatly appreciated.

# Thanks / Resources

https://github.com/es-shims

https://github.com/behnammodi/polyfill

https://polyfill.io/v3/

https://ungap.github.io/

https://github.com/Sylvain59650/all-polyfills

https://vanillajstoolkit.com/polyfills/
