const url = $request.url;
let body = JSON.parse($response.body);

// 预览横幅
if (/\/mang\/preview\/banners/.test(url)) {
  body.data = null;
}

// 热门列表顶部横幅
if (/\/buffer\/hotList/.test(url)) {
  if (body.result) delete body.result.topBanner;
}

$done({ body: JSON.stringify(body) });
