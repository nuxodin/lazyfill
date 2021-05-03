# 💊 lazyfill (beta)

Polyfill Service - the lazy way

Polyfills are only loaded when they are needed.  
Initial 2Kb to polyfill a lot of Stuff.  

Let's assume that your browser does not support the function "String.prototype.at".
```js
> ['a','b','c'].at(-1); // accessing  [].at immediately loads the polyfill
> 'c'
```


# Ussage

Add this script on the top of your page:
```html
<script src="https://cdn.jsdelivr.net/gh/nuxodin/lazyfill@0.5.0/mod.min.js"></script>
```
done!

# How it works

To every polyfillable property, the scripts adds a getter which synchronously loads the corresponding polyfill.  
Of course, we all know that blocking xhr-requests is not nice.  
Therefore, the url to the script that should be added to the page is given in the console.

# Help
Any help is greatly appreciated.

# Thanks / Resources

https://github.com/behnammodi/polyfill

https://polyfill.io/v3/

https://ungap.github.io/

https://github.com/Sylvain59650/all-polyfills

https://vanillajstoolkit.com/polyfills/
