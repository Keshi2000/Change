const url = $request.url;

// 1. 自动复制到剪贴板
if (typeof $copy !== "undefined") {
    $copy(url);
} else if (typeof $clipboard !== "undefined") {
    $clipboard.setText(url);
}

// 2. 判断来源并设置通知标题
let title = "🎬 抓到直播源";
if (url.includes("miguvideo.com") || url.includes("migu.cn")) {
    title = "🎬 抓到【咪咕视频】FLV 源";
} else if (url.includes("yjjcfw.com")) {
    title = "🎬 抓到【Jrkan】M3U8 源";
} else if (url.includes("bestv.cn")) {
    title = "🎬 抓到【百视通】M3U8 源";
}

// 3. 发送通知
$notification.post(title, "✅ 已自动复制到剪贴板", "去播放器粘贴即可");

// 4. 打印日志，方便排查
console.log("====== 抓到直播链接 ======");
console.log(title);
console.log(url);
console.log("==========================");

$done({});
