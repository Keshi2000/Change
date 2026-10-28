/*
虎扑 App - 全频道页清理 
    Keshi
1. 去除 match 组件下的活动横幅（eventInfo）
2. 直接去除整个 prominentSlot 组件（里面的赛程、数据、梦幻经理、AI工坊等全不要）
3. 去除空置的 adBanner 广告组件
*/

try {
    const obj = JSON.parse($response.body);
    let removedCount = 0;

    if (obj && obj.result && Array.isArray(obj.result.components)) {
        // 过滤掉整个不需要的组件模块
        obj.result.components = obj.result.components.filter(component => {
            const code = component.code;

            // 1. 干掉整个图标运营模块（不管是 AI工坊、梦幻经理还是赛程数据）
            if (code === "prominentSlot") {
                removedCount++;
                return false; 
            }

            // 2. 干掉空置的广告模块
            if (code === "adBanner") {
                return false;
            }

            // 3. 如果保留 match 模块，把它里面的推广横幅清空
            if (code === "match" && component.data) {
                if (Array.isArray(component.data.eventInfo) && component.data.eventInfo.length > 0) {
                    component.data.eventInfo = [];
                    removedCount++;
                }
            }

            return true; // 其他模块保留
        });
    }

    console.log(`Hupu Cleaner: 成功清理了 ${removedCount} 个广告/活动模块。`);
    $done({ body: JSON.stringify(obj) });

} catch (error) {
    console.log(`Hupu Cleaner Error: ${error}`);
    $done({});
}
