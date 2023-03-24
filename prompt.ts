export const makePrompt = (url: string) => {
    return `Please provide a recipe and steps from the following URL: ${url}.
    Return the results in an array with two nested arrays.
    The result should be in a string format with proper quotations and shapes so that running JSON.parse does not throw any errors.
    The result should only include the array with two nested arrays, and no additional strings.
    Copy code:
    [ [{"beef": "1lbs"}],["clean the beef", "cut the beef"]].
    The first array will contain an object for each ingredient item. Example : [{"beef": "1lbs"}].
    Pay special attention to the quantities being provided.
    The second array will have the steps. Each step will be its own item in the array. Example: ["clean the beef", "cut the beef"].
    Please provide the exact measurements and steps found on the website.
    Ingredients are likely to be found under a heading which contains one of the keywords ["ingredients", "ingredient list", "YOU WILL NEED", "you will need"] and any other iterations or synonyms of these words and phrases. The ingredients may also be broken into sections based on the recipe, in which case the ingredients array should return multiple nested arrays with the first index being the title of what those ingredients are used for.
    Example:[[{title:"pie filling}, {apples: "6lbs"},{sugar:"1/4 cup"}}], [{title: "crust"}, {flour:"1 cup"}]].
    The same logic should be applied to the steps. The steps should be located under headings containing keywords such as ["directions", "steps", "instructions", "cooking directions"] and any other iterations or synonyms of these words and phrases. Do not summarize the directions or steps - they should be returned exactly as they are written on the website they are found on.
    The steps may also be broken into sections based on the recipe, in which case the steps array should return multiple nested arrays with the first index being the title of what those steps/directions are used for.
    Example:[["filling", "clean all the apples", "mix the apples with the sugar and cinnamon"], ["crust", "mix all dry ingredients together", "cut in butter and flour"]].
    `
}

// Here is a example of a recipe and an expected returned value:

// ***** start of example recipe ******
// Ingredients
//     8 small Granny Smith apples, or as needed

//     ½ cup unsalted butter

//     3 tablespoons all-purpose flour

//     ½ cup white sugar

//     ½ cup packed brown sugar

//     ¼ cup water

//     1 (9 inch) double-crust pie pastry, thawed

// Directions
//     Peel and core apples, then thinly slice. Set aside.

//     Preheat the oven to 425 degrees F (220 degrees C).

//     Melt butter in a saucepan over medium heat. Add flour and stir to form a paste; cook until fragrant, about 1 to 2 minutes. Add both sugars and water; bring to a boil. Reduce the heat to low and simmer for 3 to 5 minutes. Remove from the heat.

//     Press one pastry into the bottom and up the sides of a 9-inch pie pan. Roll out remaining pastry so it will overhang the pie by about 1/2 inch. Cut pastry into eight 1-inch strips.

//     Place sliced apples into the bottom crust, forming a slight mound. Lay four pastry strips vertically and evenly spaced over apples, using longer strips in the center and shorter strips at the edges.

//     Make a lattice crust: Fold the first and third strips all the way back so they're almost falling off the pie. Lay one of the unused strips perpendicularly over the second and fourth strips, then unfold the first and third strips back into their original position.

//     Fold the second and fourth vertical strips back. Lay one of the three unused strips perpendicularly over top. Unfold the second and fourth strips back into their original position.

//     Repeat Steps 6 and 7 to weave in the last two strips of pastry. Fold and trim excess dough at the edges as necessary, and pinch to secure.

//     Slowly and gently pour sugar-butter mixture over lattice crust, making sure it seeps over sliced apples. Brush some onto lattice, but make sure it doesn't run off the sides.

//     Bake in the preheated oven for 15 minutes. Reduce the temperature to 350 degrees F (175 degrees C) and continue baking until apples are soft, 35 to 45 minutes.
// ***** end of example recipe ******

// The following recipe should be returned as follows:

// ***** start of example response ******
// [
//     [
//         {"Granny Smith apples": "8 small"},
//         {"unsalted butter": "½ cup"},
//         {"all-purpose flour": "3 tablespoons"},
//         { "white sugar" : "½ cup"},
//         { "brown sugar": "½ cup packed"},
//         { "double-crust pie pastry, thawed" : "1 (9 inch)"}
//     ],
//     [
//         "Peel and core apples, then thinly slice. Set aside.",
//         "Preheat the oven to 425 degrees F (220 degrees C).",
//         "Melt butter in a saucepan over medium heat. Add flour and stir to form a paste; cook until fragrant, about 1 to 2 minutes. Add both sugars and water; bring to a boil. Reduce the heat to low and simmer for 3 to 5 minutes. Remove from the heat."
//         "Press one pastry into the bottom and up the sides of a 9-inch pie pan. Roll out remaining pastry so it will overhang the pie by about 1/2 inch. Cut pastry into eight 1-inch strips.",
//         "Place sliced apples into the bottom crust, forming a slight mound. Lay four pastry strips vertically and evenly spaced over apples, using longer strips in the center and shorter strips at the edges.",
//         "Make a lattice crust: Fold the first and third strips all the way back so they're almost falling off the pie. Lay one of the unused strips perpendicularly over the second and fourth strips, then unfold the first and third strips back into their original position.",
//         "Fold the second and fourth vertical strips back. Lay one of the three unused strips perpendicularly over top. Unfold the second and fourth strips back into their original position.",
//         "Fold the second and fourth vertical strips back. Lay one of the three unused strips perpendicularly over top. Unfold the second and fourth strips back into their original position.",
//         "Repeat Steps 6 and 7 to weave in the last two strips of pastry. Fold and trim excess dough at the edges as necessary, and pinch to secure.",
//         "Slowly and gently pour sugar-butter mixture over lattice crust, making sure it seeps over sliced apples. Brush some onto lattice, but make sure it doesn't run off the sides.",
//         "Bake in the preheated oven for 15 minutes. Reduce the temperature to 350 degrees F (175 degrees C) and continue baking until apples are soft, 35 to 45 minutes."
//     ]
// ]
// ***** end of example response ******
