var elements = document.querySelectorAll('.mutually_dep_slider');
var length = elements.length;
var sliders = Array.prototype.slice.call(elements); // Copy of `elements` but as a real array
var max = 350;

function change(current) {
  "use strict";

  set(current);

  var input = +current.value;
  var delta = max - input;
  var sum = 0;
  var siblings = [];

  // Sum of all siblings
  sliders.forEach(function(slider) {
    if (current != slider) {
      siblings.push(slider); // Register as sibling
      sum += +slider.value;
    }
  });

  // Update all the siblings
  var partial = 0;
  siblings.forEach(function(slider, i) {
    var val = +slider.value;
    var fraction = 0;

    // Calculate fraction
    if (sum <= 0) {
      fraction = 1 / (length - 1)
    } else {
      fraction = val / sum;
    }

    // The last element will correct rounding errors
    if (i >= length - 1) {
      val = max - partial;
    } else
     {
      val = Math.round(delta * fraction);
      partial += val;
      val ++;
    }

    set(slider, val);
  });
}

// Set value on a slider
function set(elm, val) {
  if (val) {
    elm.value = val;
  }
  // Hack to trigger CSS ::after content to be updated
  elm.setAttribute('value', elm.value);
}

// Add event listeners to the DOM elements
for (var i = 0, l = elements.length; i < l; i++) {
  elements[i].addEventListener('change', function(e) {
    change(this);
  }, false);
}
