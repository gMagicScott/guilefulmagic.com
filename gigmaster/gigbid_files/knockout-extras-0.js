// knockout-extras-0.0.1.js
// ========================
// Custom additions for use with knockout

// Binding Handlers
// ----------------

// modified from http://stackoverflow.com/a/6400701/285498, mapped version here http://stackoverflow.com/a/6613255/285498
// keeps initial value (like valueKeep and checkedKeep below)
ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var initialValue = $.trim(element.getAttribute('value'));

        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable($(element).datepicker("getDate"));
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datepicker("destroy");
        });

        // If there's an initial value, set it as an actual Date
        if (initialValue !== '') {
            valueAccessor()(initialValue);
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            current = $(element).datepicker("getDate");

        if (value - current !== 0) {
            $(element).datepicker("setDate", value);
        }

        // reinitialize datepicker if neccessary
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options);
    }
};

// keep initial values set with server templating (modded from http://stackoverflow.com/a/11526775)
ko.bindingHandlers.valueKeep = {
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var initialValue;
        switch (element.nodeName.toLowerCase()) {
            case 'textarea':
                initialValue = $(element).text();
                break;
            default:
                initialValue = element.getAttribute('value');
        }
        ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, viewModel);
        valueAccessor()(initialValue);
    },
    'update': ko.bindingHandlers.value.update
};

// keep initial checked value set with server templating (modded from http://stackoverflow.com/a/11526775)
ko.bindingHandlers.checkedKeep = {
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var initialChecked = element.getAttribute('checked'),
            initialValue = element.getAttribute('value'),
            type = element.getAttribute('type');

        ko.bindingHandlers.checked.init(element, valueAccessor, allBindingsAccessor, viewModel);

        // Massage initialChecked into string then boolean for oldIE
        if (typeof initialChecked === 'boolean') {
            initialChecked = initialChecked.toString();
        } else if (!initialChecked) {
            initialChecked = '';
        }
        initialChecked = (initialChecked === 'checked' || initialChecked === 'true' ? true : false);

        switch (type) {
            case 'checkbox':
                valueAccessor()(initialChecked);
                break;
            case 'radio':
                if (initialChecked) {
                    valueAccessor()(initialValue);
                }
                break;
            default:
                throw new Error('checkedKeep: unsupported element of type ' + type);
        }
    },
    'update': ko.bindingHandlers.checked.update
};

// Animate visible change using jQuery slideDown/slideUp
ko.bindingHandlers.visibleSlide = {
    init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        // Use "unwrapObservable" so we can handle values that may or may not be observable
        $(element).toggle(ko.utils.unwrapObservable(valueAccessor()));
    },
    update: function (element, valueAccessor) {
        (ko.utils.unwrapObservable(valueAccessor()) ? $(element).slideDown() : $(element).slideUp());
    }
};

// Extenders
// ---------

// MVC binds the strings "True" and "False" to radio buttons when you give them boolean values
// So add an "asBoolean" method for JS
ko.extenders.booleanString = function (target) {
    var asBoolean = function () {
        return (this() === "True");
    };
    target['asBoolean'] = asBoolean;
    return target;
};

// force numeric inputs (http://knockoutjs.com/documentation/extenders.html)
ko.extenders.numeric = function (target, precision) {
    //create a writeable computed observable to intercept writes to our observable
    var result = ko.computed({
        read: target,  //always return the original observables value
        write: function (newValue) {
            var current = target(),
                roundingMultiplier = Math.pow(10, precision),
                newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
            //only write if it changed
            if (valueToWrite !== current) {
                target(valueToWrite);
            } else {
                //if the rounded value is the same, but a different value was written, force a notification for the current field
                if (newValue !== current) {
                    target.notifySubscribers(valueToWrite);
                }
            }
        }
    });
    //initialize with current value to make sure it is rounded appropriately
    result(target());
    //return the new computed observable
    return result;
};

// force numeric inputs, defaulting to undefined instead of 0
// modified from (http://knockoutjs.com/documentation/extenders.html)
ko.extenders.undefinableNumeric = function (target, precision) {
    // return a new computed to intercept writes
    var result = ko.computed({
        read: target,
        write: function (newValue) {
            // for empty string test
            if (typeof newValue === 'string') { newValue = $.trim(newValue); }

            if (newValue === '' ||
                newValue === null ||
                typeof newValue === 'undefined') {
                // default value is undefined if it doesn't exist or string is whitespace or empty
                target(undefined);
            } else if (isNaN(newValue)) {
                // force the value to remain as it was before
                var oldValue = target();
                target(oldValue);
                target.notifySubscribers(oldValue);
            } else {
                newValue = parseFloat(+newValue);
                var oldValue = target(),
                    roundingMultiplier = Math.pow(10, precision),
                    newRoundedValue = Math.round(newValue * roundingMultiplier) / roundingMultiplier;

                // update the value if it's changed
                // or if the rounded value is the same but the raw value changed at least notify the subscribers
                if (newRoundedValue !== oldValue) {
                    target(newRoundedValue);
                } else if (newValue !== oldValue) {
                    target.notifySubscribers(newRoundedValue);
                }
            }
        }
    });
    result(target()); // compute initial value
    return result;
};
