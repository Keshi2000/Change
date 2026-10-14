/*
虎扑 App - 去除 NBA 页面中间三个活动横幅

接口: /bplbffapi/device/v1/nav/content
目标: 删除 result.components 中 code === "match" 的 data.eventInfo 数组
*/

const url = $request.url;

// 精准匹配 URL：包含特定路径和 pageId=16
const targetPattern = /^https?:\/\/games\.mobileapi\.hupu\.com\/.*\/bplbffapi\/device\/v1\/nav\/content\?.*pageId=16.*$/;

if (targetPattern.test(url)) {
    try {
        const obj = JSON.parse($response.body);
        let removedCount = 0;

        // 防御性编程：逐层检查是否存在
        if (obj && obj.result && Array.isArray(obj.result.components)) {
            
            obj.result.components.forEach(component => {
                // 找到目标组件：match 组件，并且带 eventInfo 数组
                if (
                    component.code === "match" && 
                    component.data && 
                    Array.isArray(component.data.eventInfo)
                ) {
                    const originalLength = component.data.eventInfo.length;

                    if (originalLength > 0) {
                        // 清空所有活动横幅
                        component.data.eventInfo = [];
                        removedCount += originalLength;
                    }
                }
            });
        }

        if (removedCount > 0) {
            console.log(`Hupu NBA Cleaner: 成功移除了 ${removedCount} 个活动横幅。`);
        } else {
            console.log(`Hupu NBA Cleaner: 未发现需要处理的活动横幅，或数据结构已变更。`);
        }

        // 返回修改后的数据
        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        console.log(`Hupu NBA Cleaner Error: ${error}`);
        // 发生错误时，原样返回数据，防止 App 白屏
        $done({});
    }
} else {
    // URL 不匹配，直接放行
    $done({});
}
