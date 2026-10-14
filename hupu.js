/*
虎扑 App - 去除 NBA 页面中间所有活动横幅

接口: /bplbffapi/device/v1/nav/content
目标: 清空 result.components 中 code === "match" 的 data.eventInfo 数组
*/

const url = $request.url;

// 精准匹配 URL：包含特定路径和 pageId=16
const targetPattern = /^https?:\/\/games\.mobileapi\.hupu\.com\/.*\/bplbffapi\/device\/v1\/nav\/content\?.*pageId=16.*$/;

if (targetPattern.test(url)) {
    try {
        const obj = JSON.parse($response.body);
        let removedCount = 0;

        // 逐层检查
        if (obj && obj.result && Array.isArray(obj.result.components)) {
            obj.result.components.forEach(component => {
                // 找到目标组件：code === "match" 且带 eventInfo 数组
                if (
                    component.code === "match" && 
                    component.data && 
                    Array.isArray(component.data.eventInfo)
                ) {
                    const originalLength = component.data.eventInfo.length;
                    if (originalLength > 0) {
                        // 不管里面是什么活动，全部清空
                        component.data.eventInfo = [];
                        removedCount += originalLength;
                    }
                }
            });
        }

        if (removedCount > 0) {
            console.log(`Hupu NBA Cleaner: 成功移除了 ${removedCount} 个活动横幅。`);
        } else {
            console.log(`Hupu NBA Cleaner: 未发现活动横幅。`);
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        console.log(`Hupu NBA Cleaner Error: ${error}`);
        $done({});
    }
} else {
    $done({});
}
