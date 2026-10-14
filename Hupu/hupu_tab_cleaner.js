/*
Author:Keshi
虎扑 App - 比赛详情页去除「每日范特西 / 讨论 / 比赛预测 / 游戏」四个 Tab

接口: https://match-api.hupu.com/3/8.2.64/matchallapi/liveTabList
目标: 过滤 result.categoryList 中 categoryId 为
      live_custom_1、live_discuss、live_lottery、live_game 的项
*/

const url = $request.url;

// 精准匹配 URL：match-api.hupu.com 域名 + liveTabList 路径
const targetPattern = /^https?:\/\/match-api\.hupu\.com\/.*\/matchallapi\/liveTabList(\?.*)?$/;

if (targetPattern.test(url)) {
    try {
        const body = JSON.parse($response.body);
        let removedCount = 0;

        // 要删除的 categoryId 白名单
        const removeIds = [
            "live_custom_1",   // 每日范特西
            "live_discuss",    // 讨论
            "live_lottery",    // 比赛预测
            "live_game"        // 游戏
        ];

        // 逐层检查 result.categoryList
        if (body && body.result && Array.isArray(body.result.categoryList)) {
            const before = body.result.categoryList.length;

            body.result.categoryList = body.result.categoryList.filter(item => {
                const id = item?.categoryId || "";
                const shouldRemove = removeIds.includes(id);
                if (shouldRemove) removedCount++;
                return !shouldRemove;
            });

            // 如果默认选中的 Tab 被删了，自动切回「虎扑评分」
            const defaultId = body.result.defaultCategoryId;
            if (removeIds.includes(defaultId)) {
                body.result.defaultCategoryId = "live_score";
                console.log(`Hupu Tab Cleaner: 默认 Tab 被删除，已自动切换为 live_score。`);
            }
        }

        if (removedCount > 0) {
            console.log(`Hupu Tab Cleaner: 成功移除了 ${removedCount} 个 Tab。`);
            $done({ body: JSON.stringify(body) });
        } else {
            $done({});
        }

    } catch (error) {
        console.log(`Hupu Tab Cleaner Error: ${error}`);
        $done({});
    }
} else {
    $done({});
}
