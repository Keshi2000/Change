let body = JSON.parse($response.body);
const data = body?.result;

if (data && Array.isArray(data.newsCommonItems)) {
  data.newsCommonItems = data.newsCommonItems.filter(item => {
    const d = item?.data;
    if (!d) return true;

    // 过滤掉 AI工坊精选这类推广
    const isAd =
      d.newsContentLabel === "跳转新闻-普通" ||
      (d.customLabelInfo && d.customLabelInfo.labelName === "AI工坊精选") ||
      (d.linkUrl && /activity-static\.hupu\.com/.test(d.linkUrl));

    return !isAd;
  });
}

$done({ body: JSON.stringify(body) });
