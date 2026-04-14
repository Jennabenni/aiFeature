exports.handler = async (event) => {
  const query = event.queryStringParameters.query;

  if (!query) {
    return { statusCode: 400, body: JSON.stringify({ error: "Query is required" }) };
  }

  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = await res.json();

  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
