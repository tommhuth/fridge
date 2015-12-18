# What's in the fridge?
I got tired of never remembering what I had in the fridge, so I made this simple app to keep track. But obvs mostly to play with Laravel and Angular. Try it out at fridge.huth.io (password = password).
 
Because this is such a simple app,  I let the typography be the main design hook, scaling the font up for larger screens. Obviously, text sizing and screen space can be an issue here, but overall it seems to work out *okely dokely*, though there is certanly a threshold for how much can be placed with the heading before content gets too far down the page/fold. Probably should’ve gotten a less safe typeface than Helvetica, too.

**TODO:** Search/create is currently horrible, needs revision. 

## Make it your own
If you want to run this locally fire up `gulp` to generate static resources (js + css + fonts) and do a `migrate` (there’s also a `seeder` available for some startup data). Also, see the example `env file` which also contains the global password used for the app. 

