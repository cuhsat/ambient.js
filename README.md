ambient.js
==========
A [jQuery](https://jquery.com/) plug-in that adds sound and style to your page.

[See it live!](https://rawgit.com/cuhsat/ambient.js/master/live/index.html)

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
(Default `{}`)

#### file
Playback source.

#### play
Playback mode `once` or `loop`.

### scroll
The navigation scroll speed. Use `false` to turn off scrolling.
(Default `1000` ms)

### mouse
Mouse navigation options. Use `false` to turn off mouse navigation.
(Default `play`)

#### play
Navigate to the clicked `ambient` element.

#### prev
Navigate to the previous `ambient` element.

#### next
Navigate to the next `ambient` element.

### keys
Keyboard navigation options. Use `false` to turn off keyboard navigation.

#### prev
Navigate to the previous `ambient` element.
(Default `PAGE UP` / `ARROW UP` / `BACKSPACE`)

#### next
Navigate to the next `ambient` element.
(Default `PAGE DOWN` / `ARROW DOWN` / `ENTER` / `SPACE`)

### auto
Auto navigation to the next `ambient` element after the given milliseconds.
(Default `false`)

### loop
Loop around the navigation.
(Default `false`)

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

License
-------
Licensed under the terms of the [MIT License](LICENSE).
