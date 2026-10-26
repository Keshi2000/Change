const url = $request.url;

// 1. 获取上次弹窗的时间（防重复）
const lastTime = $persistentStore.read("last_notify_time") || 0;
const nowTime = Date.now();

// 2. 核心逻辑：如果距离上次弹窗不到 1 小时（3600000 毫秒），直接放行，不弹窗
// 这样你看一整场比赛，只会弹一次。如果换台想重新抓，重启一下 Loon 或者等 1 小时。
if (nowTime - lastTime < 3600000) {
    $done({});
    return;
}

// 3. 判断来源（设置标题）
let title = "🎬 抓到直播源";
if (url.includes("miguvideo.com") || url.includes("migu.cn")) {
    title = "🎬 抓到【咪咕】FLV 源";
} else if (url.includes("yjjcfw.com")) {
    title = "🎬 抓到【Jrkan】M3U8 源";
} else if (url.includes("bestv.cn")) {
    title = "🎬 抓到【百视通】M3U8 源";
} else if (url.includes("qq.com") || url.includes("smtcdns.net")) {
    title = "🎬 抓到【腾讯云】源";
}

// 4. 发送通知，并带上 openUrl
$notification.post(title, "👆 点击直接用浏览器播放", "已静音防打扰", {
    "openUrl": url
});

// 5. 记录本次弹窗时间
$persistentStore.write(nowTime.toString(), "last_notify_time");

// 6. 打印日志备用
console.log("====== 抓到直播链接 ======");
console.log(title);
console.log(url);
console.log("==========================");

$done({});
