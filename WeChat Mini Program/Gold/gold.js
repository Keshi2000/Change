// ========== safeSet 工具函数 ==========
function safeSet(obj, key, value) {
    if (typeof obj[key] === 'undefined' || obj[key] < value) {
        obj[key] = value;
        return true;
    }
    return false;
}

// ========== 随机数生成函数 ==========
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========== 脚本主体 ==========
let body = $request.body;

try {
    let jsonBody = JSON.parse(body);
    
    if (jsonBody.data) {
        
        // ----- 修改 totalPoint：9位数随机 (100000000 ~ 999999999) -----
        if (jsonBody.data.totalPoint !== undefined) {
            const randomScore = randomInt(100000000, 999999999);
            safeSet(jsonBody.data, 'totalPoint', randomScore);
            console.log('✅ 随机总分：' + randomScore);
        }
        
        // ----- 修改 diamondNum：6位数随机 (100000 ~ 999999) -----
        if (jsonBody.data.diamondNum !== undefined) {
            const randomDiamond = randomInt(100000, 999999);
            safeSet(jsonBody.data, 'diamondNum', randomDiamond);
            console.log('✅ 随机钻石：' + randomDiamond);
        }
        
        // ----- 修改 coinNum：8位数随机 (10000000 ~ 99999999) -----
        if (jsonBody.data.coinNum !== undefined) {
            const randomCoin = randomInt(10000000, 99999999);
            safeSet(jsonBody.data, 'coinNum', randomCoin);
            console.log('✅ 随机金币：' + randomCoin);
        }
        
        // ----- 修改 maxDoublePoint：8位数随机 (10000000 ~ 99999999) -----
        if (jsonBody.data.maxDoublePoint !== undefined) {
            const randomDouble = randomInt(10000000, 99999999);
            safeSet(jsonBody.data, 'maxDoublePoint', randomDouble);
            console.log('✅ 随机双人最高分：' + randomDouble);
        }
        
        // ----- 修改 maxDoubleMonthPoint：8位数随机 (10000000 ~ 99999999) -----
        if (jsonBody.data.maxDoubleMonthPoint !== undefined) {
            const randomDoubleMonth = randomInt(10000000, 99999999);
            safeSet(jsonBody.data, 'maxDoubleMonthPoint', randomDoubleMonth);
            console.log('✅ 随机双人本月最高分：' + randomDoubleMonth);
        }

        // ========== 🆕 新增：修改单人最高分 ==========
        // ----- 修改 maxSinglePoint：8位数随机 (10000000 ~ 99999999) -----
        if (jsonBody.data.maxSinglePoint !== undefined) {
            const randomSingle = randomInt(10000000, 99999999);
            safeSet(jsonBody.data, 'maxSinglePoint', randomSingle);
            console.log('✅ 随机单人最高分：' + randomSingle);
        }
        
        // ----- 修改 maxSingleMonthPoint：8位数随机 (10000000 ~ 99999999) -----
        if (jsonBody.data.maxSingleMonthPoint !== undefined) {
            const randomSingleMonth = randomInt(10000000, 99999999);
            safeSet(jsonBody.data, 'maxSingleMonthPoint', randomSingleMonth);
            console.log('✅ 随机单人本月最高分：' + randomSingleMonth);
        }
        
        // ----- lastMaxDoublePointMonth 保持当前月份，无需修改 -----
        // 已存在的字段保留原值，不覆盖
    }
    
    $done({ body: JSON.stringify(jsonBody) });
    
} catch (e) {
    console.log('❌ 脚本执行出错：' + e.message);
    $done({ body: body });
}
