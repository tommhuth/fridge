# What's in the fridge?
I got tired of never remembering what I had in the fridge, so I made this simple app to keep track. But obvs mostly to play with Laravel and Angular. Try it out at fridge.huth.io (password = password).

## Design 
Because this is such a simple app, it felt like a natural testing ground for a hypothesis of mine: there are too many designs out there that throw in lots of extra stuff, including imagery, for the sake of filling the screen up, instead of letting the content speak for itself. I let the typography be the main design hook (including scaling the font up for larger screens), though that is hardly an original idea. Obviously, text sizing and screen space can be an issue here, but overall it seems to work out *okely dokely*. Probably should’ve gotten a less safe typeface than Helvetica though.

## Make it your own
If you want to run this locally fire up `gulp` to generate static resources (js + css + fonts) and do a `migrate` (there’s also a `seeder` available for some startup data). Also, see the example `env file` which also contains the global password used for the app. 

