const url = $request.url;

// 1. 获取上次弹窗的时间（防重复）
const lastTime = $persistentStore.read("last_notify_time") || 0;
const nowTime = Date.now();

// 2. 核心逻辑：如果距离上次弹窗不到 15 秒，直接放行，不弹窗
if (nowTime - lastTime < 15000) {
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
// 点击通知后，Loon 会把这个链接丢给系统的默认浏览器打开
$notification.post(title, "👆 点击直接用浏览器播放", url, {
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
