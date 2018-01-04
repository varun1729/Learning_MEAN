let faker = require("faker");
let randImgUrl = "";
for (let i = 0; i < 10; i++){
	randImgUrl = faker.image.nature();
	console.log("{name: " + "\"img"+ i +"\", url: \"" + randImgUrl + "\"," + "},");
}