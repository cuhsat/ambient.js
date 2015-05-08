/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Christian Uhsat <christian@uhsat.de>
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
Storyboard = function (config) {
  this.config = config || {
    "default": {
    }
  };

  var storyboard = $(".storyboard:first");
  var sb_active = storyboard.children(".sb:first");
  var sb = storyboard.children(".sb:not(:first)");

  sb.css("opacity", 0.1);
  sb_active.addClass("sb-active");

  function next() {
    var sb_next = sb_active.next(".sb");

    if (sb_next.length) {
      sb_active.animate({"opacity": 0.1});
      sb_active.removeClass("sb-active");

      sb_active = sb_next;

      sb_active.animate({"opacity": 1.0});
      sb_active.addClass("sb-active");
    }
  }

  // Switch scene
  $(window).keypress(function(e) {
    if (e.keyCode == 0 || e.keyCode == 32) {
      next();
    }
  });
}();
