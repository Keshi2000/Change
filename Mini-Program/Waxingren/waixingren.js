// ============ 随机工具 ============
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============ 主拦截入口（请求拦截）============
if (typeof $request !== "undefined") {
    let body = $request.body;
    try {
        let req = JSON.parse(body);

        if (req.data) {
            let inner = JSON.parse(req.data);
            inner.coin = randomInt(10000, 99999);
            req.data = JSON.stringify(inner);
        }

        $done({ body: JSON.stringify(req) });
    } catch (e) {
        console.log("请求解析失败:", e);
        $done({ body: $request.body });   // 出错原样放行
    }
} else {
    $done({});
}
