require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const unirest = require("unirest");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public/"));

app.use(bodyParser.urlencoded({extended: true}));

const recipes = [];

app.get("/", function(req, res){
    res.render("index", {recipes: recipes});
});
 
const apiKey = process.env.API_KEY;
const number = 7;
const requestString = "https://api.spoonacular.com/recipes/random?number=" + number + "&apiKey=" + apiKey;

app.post("/",function(req, res){
    unirest.get(requestString)
    .end(function(result){
        if (result.status === 200)
        {   
            res.render("index", {recipes: result.body.recipes});
        }    
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

/* Ausgabe API bei einem angefragten Rezept
recipes: [
    {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 4,
      gaps: 'no',
      lowFodmap: false,
      aggregateLikes: 6,
      spoonacularScore: 54,
      healthScore: 13,
      creditsText: 'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
      license: 'CC BY 3.0',
      sourceName: 'Foodista',
      pricePerServing: 292.22,
      extendedIngredients: [Array],
      id: 665016,
      title: 'Watermelon Jalapeño Cocktail Cooler',
      readyInMinutes: 45,
      servings: 6,
      sourceUrl: 'https://www.foodista.com/recipe/5JF2LB3S/watermelon-jalapeno-cocktail-cooler',
      image: 'https://spoonacular.com/recipeImages/665016-556x370.jpg',
      imageType: 'jpg',
      summary: 'Watermelon Jalapeño Cocktail Cooler might be a good recipe to expand your beverage repertoire. This recipe serves 6. For <b>$2.92 per serving</b>, this recipe <b>covers 17%</b> of your daily requirements of vitamins and minerals. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has <b>380 calories</b>, <b>5g of protein</b>, and <b>1g of fat</b> per serving. 6 people were glad they tried this recipe. It will be a hit at your <b>Summer</b> event. A mixture of whiz the watermelon in a blender and strain, jalapeño peppers, ice cubes, and a handful of other ingredients are all it takes to make this recipe so yummy. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. It is brought to you by Foodista. Taking all factors into account, this recipe <b>earns a spoonacular score of 53%</b>, which is solid. <a href="https://spoonacular.com/recipes/watermelon-cooler-516082">Watermelon Cooler</a>, <a href="https://spoonacular.com/recipes/watermelon-cooler-225155">Watermelon Cooler</a>, and <a href="https://spoonacular.com/recipes/watermelon-cooler-27668">Watermelon Cooler</a> are very similar to this recipe.',
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [Array],
      instructions: 'Whiz the chilled watermelon in a blender and strain for a smoother cocktail to serve on ice. For a frozen variation, freeze some watermelon cubes and blend it in with the chilled watermelon.\n' +
        'In a large pitcher, muddle 1 lime, herb leaves, and 1-2 jalapeos. Use a rolling pin or the bottom of a glass bottle if you dont have a muddler.\n' +
        'Stir in the blended watermelon, liquor, a splash of soda, and sweeten to taste.\n' +
        'Serve in ice-filled glasses and garnish with lime wedges, herbs, and jalapeo slices.',
      analyzedInstructions: [Array],
      originalId: null,
      spoonacularSourceUrl: 'https://spoonacular.com/watermelon-jalapeo-cocktail-cooler-665016'
    }
  ]
}
*/