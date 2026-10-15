let body = JSON.parse($response.body);
const data = body?.data;

if (data && Array.isArray(data.cards)) {
  data.cards = data.cards.filter(card => {
    return card.code === "infobox" || card.code === "grids";
  });
}

$done({ body: JSON.stringify(body) });
