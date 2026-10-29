const url = $request.url;
const nowTime = Date.now();

// 1. 判断是直播还是点播（用于独立计算冷却时间）
let isLive = false;
if (url.includes("live") || url.includes(".flv") || url.includes("index.m3u8")) {
    isLive = true;
}

const storeKey = isLive ? "last_time_live" : "last_time_vod";
const lastTime = $persistentStore.read(storeKey) || 0;

// 2. 冷却时间：1小时内同类不重复弹
if (nowTime - lastTime < 3600000) {
    $done({});
    return;
}

// 3. 智能识别来源并设置标题
let title = "🎬 抓到视频源";
let platform = "未知";

if (url.includes("miguvideo.com") || url.includes("migu.cn")) {
    platform = url.includes(".flv") ? "咪咕 FLV" : "咪咕 M3U8";
    title = `🎬 抓到【${platform}】源`;
} else if (url.includes("smtcdns") && url.includes("video.qq.com")) {
    platform = "腾讯体育";
    title = `🎬 抓到【${platform}】源`;
} else if (url.includes("bestv.cn")) {
    platform = "百视通";
    title = `🎬 抓到【${platform}】源`;
}

// 4. 发送通知并附带跳转 URL
$notification.post(title, "👆 点击直接用浏览器播放", "已开启防刷屏", {
    "openUrl": url
});

// 5. 记录独立的冷却时间
$persistentStore.write(nowTime.toString(), storeKey);

// 6. 打印日志
console.log(`====== 抓到 [${platform}] 链接 ======`);
console.log(url);
console.log("==========================");

$done({});