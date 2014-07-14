(function () {

  var currentScript = document._currentScript || document.currentScript;
  var owner = currentScript.ownerDocument;
  var template = owner.querySelector("#brick-form-template");

  var BrickFormElementPrototype = Object.create(HTMLElement.prototype);

  BrickFormElementPrototype.attachedCallback = function () {
    var self = this;

    var shadow = this.createShadowRoot();
    var clonedTemplate = template.content.cloneNode(true);

    self.form = clonedTemplate.querySelector("form");

    shadow.appendChild(clonedTemplate);

    if (self.autosave) {
      self.addEventListener("change", function(){
        self.saveFormData();
      });
    }

    self.addEventListener("submit", function(e){
      e.preventDefault();
      self.saveFormData();
    });

    self.loadFormData();
  };

  BrickFormElementPrototype.detachedCallback = function () {

  };

  BrickFormElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
    if (attr in attrs) {
      attrs[attr].call(this, oldVal, newVal);
    }
  };

  var attrs = {
    'name': function () {
      this.loadFormData();
    }
  };


  BrickFormElementPrototype.loadFormData = function () {
    var self = this;
    self.storage.get(self.name).then(function(data){
      for (var i = 0; i < self.elements.length; i++) {
        var element = self.elements[i];
        var val = data ? data[element.name] || "" : "";
        if (element.type === "checkbox") {
          element.checked = !!val;
        } else {
          element.value = val;
        }
      }
    });
  };

  BrickFormElementPrototype.saveFormData = function () {
    var self = this;
    var data = {};
    data[self.key] = self.name;
    for (var i = 0; i < self.elements.length; i++) {
      var input = self.elements[i];
      var key = input.name;
      var value = input.value;
      if (input.type === "checkbox") {
        value = input.checked;
      }
      data[key] = value;
    }
    return self.storage.set(data);
  };

  // Property handlers
  Object.defineProperties(BrickFormElementPrototype, {
    'name': {
      get: function () {
        return this.getAttribute("name");
      },
      set: function (newVal) {
        this.setAttribute("name", newVal);
      }
    },
    'autosave': {
      get: function () {
        return this.hasAttribute("autosave");
      },
      set: function (newVal) {
        if (newVal) {
          this.setAttribute("autosave", newVal);
        } else {
          this.removeAttribute("autosave");
        }
      }
    },
    'storage': {
      get: function () {
        return document.getElementById(this.getAttribute("storage"));
      }
    },
    'elements': {
      get: function() {
        return this.form.elements;
      }
    },
    'keyname': {
      get: function() {
        return this.storage.getAttribute("keyname");
      }
    }
  });

  // Register the element
  window.BrickFormElement = document.registerElement('brick-form', {
    prototype: BrickFormElementPrototype
  });

})();
