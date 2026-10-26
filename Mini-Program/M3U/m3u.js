const url = $request.url;

// 1. 获取上次弹窗的时间（防重复）
const lastTime = $persistentStore.read("last_notify_time") || 0;
const nowTime = Date.now();

// 2. 核心逻辑：如果距离上次弹窗不到 15 秒，直接放行，不弹窗
if (nowTime - lastTime < 15000) {
    $done({});
    return;
}

// 3. 判断来源
let title = "🎬 抓到直播源";
if (url.includes("miguvideo.com") || url.includes("migu.cn")) {
    title = "🎬 抓到【咪咕】FLV 源";
} else if (url.includes("yjjcfw.com")) {
    title = "🎬 抓到【Jrkan】M3U8 源";
} else if (url.includes("bestv.cn")) {
    title = "🎬 抓到【百视通】M3U8 源";
} else if (url.includes("qq.com") || url.includes("smtcdns.net")) {
    title = "🎬 抓到【腾讯云】M3U8/TS 源";
}

// 4. 尝试复制到剪贴板 (Loon 的多重兼容写法)
let copySuccess = false;
try {
    if (typeof $clipboard !== "undefined") {
        $clipboard.setText(url); // Loon 常用
        copySuccess = true;
    } else if (typeof $pasteboard !== "undefined") {
        $pasteboard.write(url);
        copySuccess = true;
    } else if (typeof $copy !== "undefined") {
        $copy(url); // Surge/旧版 Loon
        copySuccess = true;
    }
} catch (e) {
    copySuccess = false;
}

// 5. 发送通知
if (copySuccess) {
    $notification.post(title, "✅ 已尝试复制到剪贴板", "如果粘贴不出来，请去 Loon 日志复制");
} else {
    $notification.post(title, "⚠️ 请去 Loon 日志复制", "当前 Loon 版本不支持静默复制");
}

// 6. 记录本次弹窗时间，更新状态
$persistentStore.write(nowTime.toString(), "last_notify_time");

// 7. 打印日志（不管复没复制，日志里都有）
console.log("====== 抓到直播链接 ======");
console.log(title);
console.log(url);
console.log("==========================");

$done({});
