/* This file contains a collection of JavaScript general utility/extension
* functions:
*       --Function List--
*   arrayMaximum(array)
*/



/* This function takes an array of objects and returns the smallest one.
*/
function arrayMinimum(array) {
    var smallest = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] < smallest) { smallest = array[i]; }
    }
    return smallest;
} // End arrayMinimum() function.



/* This function takes an array of objects and returns the largest one.
*/
function arrayMaximum(array) {
    var largest = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] > largest) { largest = array[i]; }
    }
    return largest;
} // End arrayMaximum() function.