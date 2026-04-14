This one page website, called My Forecast, My Day, displays the weather in a specified city and grabs an image from unsplash and displays one that correlates with the keywords in the weather, such as 'sunny', 'raining', etc.

The services used were:
- Open Weather Map
https://openweathermap.org/api

- Unsplash
https://unsplash.com/developers

To run:

If running this on your own machine, you will need a config.js file with the API keys, in the format:


const CONFIG = {
  OPENWEATHER_API_KEY: "INSERT API KEY",
  UNSPLASH_ACCESS_KEY: "INSERT API KEY",
};

To get your own API keys, you will need to make a free account on both services.  Open Weather gives you an API by default, and Unsplash requires you to start a new project, and will then give you a key.  The API key for the weather API will not work for the first ten minutes, but after that they should be able to connect.  If deploying to Netlify, the keys will instead be inserted into the 'Environment Variables' section during setup.  This project is setup for Netlify, and would need some editing to be used on a personal machine.

If setup locally, 'npx serve .' would need to be typed into the terminal to activiate the APIs, as the browser blocks the APIs when index.html is run by itself.  Ctrl + C will close it.