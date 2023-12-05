let array = [5, 7, 21, -610, -14, 25, 66, 1];

let max = array[0];

for (var i = 1; i < array.length; i++) {
    if (array[i] > max) {
        max = array[i];
    }
}

console.log("The greatest number inside of this whole number array is: ", max);