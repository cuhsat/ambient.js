Ambient.js
==========
Get your page some ambience!

Ambient.js is a [jQuery](https://jquery.com/) plug-in that adds sound and
style to your page. See the [Demo](https://cdn.rawgit.com/cuhsat/ambient.js/master/demo/index.html)!

Actions
-------
### play
Starts the playback of the current (or first) `ambient` element.

### stop
Stops the playback of the current `ambient` element.

### prev
Navigates to the previous `ambient` element.

### next
Navigates to the next `ambient` element.

Options
-------
### playlist
Dictonary for all sound playbacks. Index by the `ambient` elements id.
*(Default `{}`)*

### scroll
The navigation scroll speed. Use `false` to turn off scrolling.
*(Default `1200` ms)*

### loop
Should the navigation loop or not?
*(Default `false`)*

### keys

#### prev
Navigate to the previous `ambient` element.
*(Default `ARROW UP` / `BACKSPACE`)*

#### next
Navigate to the next `ambient` element.
*(Default `ARROW DOWN` / `SPACE`)*

Callbacks
---------
### onPlay(element)
Will be called on action `play` with the current `ambient` element. Return 
`false` to cancel the action.

### onStop(element)
Will be called on action `stop` with the current `ambient` element. Return 
`false` to cancel the action.

### onPrev(element)
Will be called on action `prev` with the current `ambient` element. Return 
`false` to cancel the action.

### onNext(element)
Will be called on action `next` with the current `ambient` element. Return 
`false` to cancel the action.

Includes
--------
CSS:
```
<link rel="stylesheet" href="https://raw.githubusercontent.com/cuhsat/ambient.js/master/ambient.css"/>
```

Javascript:
```
<script type="text/javascript" src="https://raw.githubusercontent.com/cuhsat/ambient.js/master/ambient.js"></script>
```

License
-------
Licensed under the terms of the [MIT License](LICENSE).
