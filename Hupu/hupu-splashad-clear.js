let body = JSON.parse($response.body);
body.ads = [];
$done({ body: JSON.stringify(body) });
