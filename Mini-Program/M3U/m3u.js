const url = $request.url;
const nowTime = Date.now();

// 1. 判断是直播还是点播，决定使用哪个冷却标记
let isLive = false;
if (url.includes("live") || url.includes(".flv")) {
    isLive = true;
}

const storeKey = isLive ? "last_time_live" : "last_time_vod";
const lastTime = $persistentStore.read(storeKey) || 0;

// 2. 冷却时间：直播 1 小时，点播 1 小时（分别计算）
if (nowTime - lastTime < 3600000) {
    $done({});
    return;
}

// 3. 判断来源和设置标题
let title = "🎬 抓到视频源";
if (url.includes("miguvideo.com") || url.includes("migu.cn")) {
    title = "🎬 抓到【咪咕】直播 FLV";
} else if (url.includes("bestv.cn")) {
    title = isLive ? "🎬 抓到【百视通】直播源" : "🎬 抓到【百视通】回放源";
}

// 4. 发送通知并跳转浏览器
$notification.post(title, "👆 点击直接用浏览器播放", "已开启防骚扰", {
    "openUrl": url
});

// 5. 记录独立的冷却时间
$persistentStore.write(nowTime.toString(), storeKey);

// 6. 打印日志
console.log(`====== 抓到${isLive ? '直播' : '点播'}链接 ======`);
console.log(url);
console.log("==========================");

$done({});