let mongoose = require('mongoose');
let Campground = require("./models/campground");
let Comment = require("./models/comment");

let data = [{
    name: "Soapstone Campground",
    url: "https://www.reserveamerica.com/webphotos/NRSO/pid70140/1/540x360.jpg",
    description: "Tucked into the gorgeous Uinta Mountains, campsites here are surrounded by thick groves of pine, fir and aspen trees. Explore the beauty of the Uinta Mountains, with cascading streams and alpine lakes dotting the trails. Or, drive through the mountains on the Mirror Lake Scenic Byway and get out to hike along the way.",
}, {
    name: "Cumberland Falls State Park",
    url: "https://www.reserveamerica.com/marketing/html/acm/__shared/assets/cumberland_falls2681.jpg",
    description: "If Niagara Falls is too far, come visit the next best thing. Cumberland Falls is what many call the 'Niagara of the South.' This natural wonder at 125-feet wide, is breathtaking and majestic in its grandeur. But that's not all; this scenic camping spot is home to the 'moonbow,' a lunar rainbow that is found nowhere else in the Western Hemisphere.",
}, {
    name: "Julia Pfeiffer Burns State Park",
    url: "https://www.reserveamerica.com/marketing/html/acm/__shared/assets/soapstone_campground2680.jpg",
    description: "Known as one of the most beautiful stretches on the California coastal highway, Big Sur is truly magnificent, and this scenic camping spot is the perfect place to take in the views. If you can score the right campsite you'll wake up to breathtaking views of the turquoise Pacific Ocean crashing below you. Then, head toward land and hike through the picturesque mountains, too.",
}, ];

function seedDB() {
    // Campground.remove({}, function(error) {});
}
        // if (error) {
        //     console.log(error);
        // } else {
        //     Comment.remove({}, function(error) {
        //         if (error) {
        //             console.log(error)
        //         } else {
        //             console.log("ALL DATA REMOVED");
//                     data.forEach(function(seed) {
//                         Campground.create(seed, function(error, addedCampground) {
//                             if (error) {
//                                 console.log(error);
//                             } else {
//                                 console.log("added a Campground");
//                                 Comment.create({
//                                     text: "Great spot, beautiful weather and wondeful wildlife!",
//                                     author: "Heisenberg",
//                                 }, function(error, comment) {
//                                     if (error) {
//                                         console.log(error);
//                                     } else {
//                                         addedCampground.comments.push(comment._id);
//                                         addedCampground.save(function (error){
//                                             if(error){
//                                                 console.log(error)
//                                             } else {
//                                                 console.log("Created a comment");
//                                             }
//                                         });
//                                     }
//                                 });
//                             }
//                         });
//                     });
//                 }

//             });

//         }
//     });
// }
module.exports = seedDB;