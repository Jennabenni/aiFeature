exports.handler = async (event) => {
  const city = event.queryStringParameters.city;

  if (!city) {
    return { statusCode: 400, body: JSON.stringify({ error: "City is required" }) };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.replace(/ /g, "+")}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`
  );
  const data = await res.json();

  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
