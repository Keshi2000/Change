/*
虎扑 App - NBA 首页清理 
    Keshi
1. 去除 match 组件下的三个活动横幅（eventInfo）
2. 去除 prominentSlot 组件下的「AI工坊」和「NBA游戏」图标
*/

const url = $request.url;

// 精准匹配 URL：包含特定路径和 pageId=16
const targetPattern = /^https?:\/\/games\.mobileapi\.hupu\.com\/.*\/bplbffapi\/device\/v1\/nav\/content\?.*pageId=16.*$/;

if (targetPattern.test(url)) {
    try {
        const obj = JSON.parse($response.body);
        let removedCount = 0;

        if (obj && obj.result && Array.isArray(obj.result.components)) {
            obj.result.components.forEach(component => {

                // ============ 处理 1：去除活动横幅 ============
                if (
                    component.code === "match" &&
                    component.data &&
                    Array.isArray(component.data.eventInfo)
                ) {
                    const before = component.data.eventInfo.length;
                    if (before > 0) {
                        component.data.eventInfo = [];
                        removedCount += before;
                    }
                }

                // ============ 处理 2：去除 prominentSlot 中的图标 ============
                if (
                    component.code === "prominentSlot" &&
                    component.data &&
                    Array.isArray(component.data.configs)
                ) {
                    const removeTitles = ["AI工坊", "NBA游戏"];
                    const before = component.data.configs.length;

                    component.data.configs = component.data.configs.filter(item => {
                        const title = item?.title || "";
                        const shouldRemove = removeTitles.includes(title);
                        if (shouldRemove) removedCount++;
                        return !shouldRemove;
                    });
                }

            });
        }

        if (removedCount > 0) {
            console.log(`Hupu NBA Cleaner: 成功移除了 ${removedCount} 个元素。`);
        } else {
            console.log(`Hupu NBA Cleaner: 未发现需要处理的内容。`);
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        console.log(`Hupu NBA Cleaner Error: ${error}`);
        $done({});
    }
} else {
    $done({});
}
