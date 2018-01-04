let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app")

let dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    mood: String,
});

let Dog = mongoose.model("Dog", dogSchema);
// let buddy = new Dog({
//     name: "Buddy",
//     age: 2,
//     mood: "up-beat",
// });
// buddy.save(function(error, dog){
// 	if (error){
// 		console.log("DID NOT SAVE");
// 	}
// 	else{
// 		console.log("SAVED");
// 		console.log(dog);
// 	}

// });

Dog.create({
	name: "Spot",
	age: 12,
	mood: "happy",
}, function(error,dog){
	if(error){
		console.log(err)
	} else {
		console.log("Succesfully created: ")
		console.log(dog);
	}
});

Dog.find({}, function(error, dogs){
	if (error){
		console.log("ERROR");
	}
	else{
		console.log(dogs);
	}
});