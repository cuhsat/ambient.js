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
   * ambient.js jquery plug-in.
   */
  $.fn.ambient = function(action, element) {
    var root = this;

    if (typeof(action) === "object" || action instanceof Object) {
      $.fn.ambient.options = $.extend({}, $.fn.ambient.defaults, action);

      root.find("audio").remove();

      $.each($.fn.ambient.options.playlist, function(index, value) {
        var audio = {
          preload: "auto",
          src: value.file
        };

        if (value.play == "loop") {
          audio["loop"] = "loop";
        }

        $("<audio/>", audio).appendTo($("#" + index));
      });
    }

    if (typeof(action) === "string" || action instanceof String) {
      switch (action) {
        case "prev": prevAmbient(element); break
        case "next": nextAmbient(element); break
        case "play": playAmbient(element); break
        case "stop": stopAmbient(element); break
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

      if (!$.fn.ambient.options.loop && !ambient.length) {
        ambient = element;
      }

      return ambient.length ? ambient : getLast();
    }

    function getNext(element) {
      var ambient = element.next(".ambient");

      if (!$.fn.ambient.options.loop && !ambient.length) {
        ambient = element;
      }

      return ambient.length ? ambient : getFirst();
    }

    function prevAmbient(element) {
      var ambient = element || getPlaying();

      if ($.fn.ambient.options.onPrev.call(root, ambient) === false) {
        return; // Canceled
      }

      stopAmbient(ambient);
      playAmbient(getPrev(ambient));
    }

    function nextAmbient(element) {
      var ambient = element || getPlaying();

      if ($.fn.ambient.options.onNext.call(root, ambient) === false) {
        return; // Canceled
      }

      stopAmbient(ambient);
      playAmbient(getNext(ambient));
    }

    function playAmbient(element) {
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
      playAudio(ambient);
    }

    function stopAmbient(element) {
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

    function playAudio(element) {
      var ambient = element || getPlaying();
      
      if ($.fn.ambient.options.playlist[ambient.prop("id")]) {
        root.find("audio").each(function() {
          this.pause();
        });

        ambient.find("audio").each(function() {
          this.play();
        });
      }
    }

    if ($.fn.ambient.options.mouse !== false) {
      root.find(".ambient").unbind("click").click(function(e) {
        if ($.fn.ambient.options.mouse == "prev") {
          prevAmbient();
        }

        if ($.fn.ambient.options.mouse == "next") {
          nextAmbient();
        }

        if ($.fn.ambient.options.mouse == "play") {
          stopAmbient();
          playAmbient($(this));
        }
      });
    }

    if ($.fn.ambient.options.keys !== false) {
      $(document).unbind("keyup").keyup(function(e) {
        var keycode = e.keyCode || e.which || e.charCode;

        if ($.inArray(keycode, $.fn.ambient.options.keys.prev) != -1) {
          e.preventDefault();
          prevAmbient();
        }

        if ($.inArray(keycode, $.fn.ambient.options.keys.next) != -1) {
          e.preventDefault();
          nextAmbient();
        }
      });      
    }

    if ($.fn.ambient.options.auto !== false) {
      setInterval(nextAmbient, $.fn.ambient.options.auto);
    }

    if (!action) {
      playAmbient();
    }

    return this;
  };

  /**
   * ambient.js default options.
   */
  $.fn.ambient.options = $.fn.ambient.defaults = {
    playlist: {},
    onPrev: function() {},
    onNext: function() {},
    onPlay: function() {},
    onStop: function() {},
    scroll: 1000,
    mouse: "play",
    keys: {
      prev: [8, 33, 38],
      next: [13, 32, 34, 40]
    },
    auto: false,
    loop: false
  };
}(jQuery));
