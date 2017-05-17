// Setup
var mongoose = require("mongoose");
// connect to db
mongoose.connect("mongodb://localhost/mongoRelationships");
// shorthand so we don't have to type as much
var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
  title: {
    type: String,
    name: "sour cream"
  },
  foodGroup: {
    type: String,
    group: "dairy"
  }
});

var ingredientSchema = new Schema({
  title: {
    type: String,
    name: "tomatoe"
  },
  food group: {
    type: String,
    group: "vegetable"
  }
});

var ingredientSchema = new Schema({
  title: {
    type: String,
    name: "avocado"
  },
  foodGroup: {
    type: String,
    group: "vegetable"
  }
});


/* make a new Ingredient document */
var sourCream = new db.Ingredient ({
 title: 'sour cream',
 foodGroup: 'dairy'
});

var tomatoe = new db.Ingredient ({
 title: 'tomatoe',
 foodGroup: 'vegetable'
});

var avocado = new db.Ingredient ({
 title: 'avocado',
 foodGroup: 'vegetable'
});

/* make a new Food document */
var enchiladaVerde = new db.Food ({
  name: 'Enchilada',
  ingredients: []
});

var tacoSalad = new db.Food ({
  name: 'Taco salad',
  ingredients: []
});

var quesdilla = new db.Food ({
  name: 'Quesadilla',
  ingredients: []
});

// Referenced Data
var foodSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  }]
});

var ingredientSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  food group: {
    type: String,
    name: ""
  }
})


//compiling models from above schema
var Food = mongoose.model("Food", foodSchema);
var Ingredient = mongoose.model("Ingredient", ingredientSchema);

//list all ingredient data for a food with .populate
db.Food.findOne({name: 'EnchiladaVerdes' })
  .populate('ingredients')
  .exec(function(err, food){
    if(err){
      console.log(err);
    }
    if(food.ingredients.length > 0) {
      console.log('/nI love ' + food.name + 'for the' + food.ingredients[0].title);
    }
    else {
      console.log(food.name + 'has no ingredients.');
    }
    console.log('What was the food?', food);
});

// Embedded Data
var tweetSchema = new Schema({
  text: String,
  date: Date
});

var userSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  tweets: [tweetSchema]
});

var User = mongoose.model("User", userSchema);
var Tweet = mongoose.model("Tweet", tweetSchema);

// Export
exports.Food = Food;
exports.Ingredient = Ingredient;
exports.User = User;
exports.Tweet = Tweet;

// Close connection on close
process.on('exit', function() {
  console.log('About to exit...');
  mongoose.disconnect(function() {
    console.log("Disconnected DB");
    process.exit(); // now exit the node app
  });
});
