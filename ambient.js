/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Christian Uhsat <christian@uhsat.de>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
(function($) {
  /**
   * Ambient.js jQuery plug-in.
   */
  $.fn.ambient = function(action) {
    var root = this;

    if (typeof(action) === "object" || action instanceof Object) {
      $.fn.ambient.options = $.extend({}, $.fn.ambient.defaults, action);
    }

    if (typeof(action) === "string" || action instanceof String) {
      switch (action) {
        case "prev": prev(); break
        case "next": next(); break
        case "play": play(); break
        case "stop": stop(); break
      }
    }

    function getPlaying() {
      return root.find(".ambient.playing");
    }

    function getFirst() {
      return root.find(".ambient:first");
    }

    function getLast() {
      return root.find(".ambient:last");
    }

    function getPrev(element) {
      var ambient = element.prev(".ambient");

      if (!ambient.length) {
        ambient = !$.fn.ambient.options.loop ? element : getLast();
      }

      return ambient;
    }

    function getNext(element) {
      var ambient = element.next(".ambient");

      if (!ambient.length) {
        ambient = !$.fn.ambient.options.loop ? element : getFirst();
      }

      return ambient;
    }

    function playSound(element) {
      var ambient = element || getPlaying();
      var source = $.fn.ambient.options.playlist[ambient.prop("id")];

      if (source) {
        root.find("audio").remove();

        $("<audio/>", {
          src: source,
          autoplay: "autoplay"
        }).appendTo(ambient);
      }
    }

    function prev(element) {
      var ambient = element || getPlaying();

      if ($.fn.ambient.options.onPrev.call(root, ambient) === false) {
        return; // Canceled
      }

      stop(ambient);
      play(getPrev(ambient));
    }

    function next(element) {
      var ambient = element || getPlaying();

      if ($.fn.ambient.options.onNext.call(root, ambient) === false) {
        return; // Canceled
      }

      stop(ambient);
      play(getNext(ambient));
    }

    function play(element) {
      var ambient = element || getFirst();

      if (ambient.hasClass("playing")) {
        return; // Canceled
      }

      if ($.fn.ambient.options.onPlay.call(root, ambient) === false) {
        return; // Canceled
      }

      if ($.fn.ambient.options.scroll !== false) {
        var top = ambient.offset().top;

        $("html, body").stop().animate({
          scrollTop: top - ((root.height() - ambient.height()) / 2)
        }, $.fn.ambient.options.scroll);
      }

      ambient.removeClass("played");
      ambient.addClass("playing");
      playSound(ambient);
    }

    function stop(element) {
      var ambient = element || getPlaying();

      if (ambient.hasClass("played")) {
        return; // Canceled
      }

      if ($.fn.ambient.options.onStop.call(root, ambient) === false) {
        return; // Canceled
      }

      ambient.removeClass("playing");
      ambient.addClass("played");
    }

    $(window).unbind("keyup").keyup(function(e) {
      var keycode = e.keyCode || e.which;

      if ($.inArray(keycode, $.fn.ambient.options.keys.prev) != -1) {
        (getPlaying().length ? prev : play)();
        e.preventDefault();
        return false;
      }

      if ($.inArray(keycode, $.fn.ambient.options.keys.next) != -1) {
        (getPlaying().length ? next : play)();
        e.preventDefault();
        return false;
      }
    });

    if (!action) {
      play();
    }

    return this;
  };

  /**
   * Ambient.js default options.
   */
  $.fn.ambient.options = $.fn.ambient.defaults = {
    playlist: {},
    onPrev: function() {},
    onNext: function() {},
    onPlay: function() {},
    onStop: function() {},
    scroll: 1200,
    loop: false,
    keys: {
      prev: [8, 38],
      next: [32, 40]
    }
  };
}(jQuery));
