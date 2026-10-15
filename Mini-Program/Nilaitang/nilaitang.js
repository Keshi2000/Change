// ========== 你来躺 全皮肤解锁 + 金币/道具修改（只增不减） ==========

// ========== 随机数工具 ==========
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========== 只增不减的赋值函数 ==========
function setIfGreater(obj, key, targetValue) {
    if (typeof obj[key] === 'undefined' || obj[key] < targetValue) {
        obj[key] = targetValue;
        return true;
    }
    return false;
}

// ========== 主逻辑 ==========
if (typeof $response !== "undefined") {
    let body = JSON.parse($response.body);
    let data = JSON.parse(body.data);

    // 确保 GameInfo 存在
    if (!data.GameInfo) {
        data.GameInfo = {};
    }

    // ========== 1. 初始化缺失字段 ==========
    if (!data.GameInfo.ownSkin)        data.GameInfo.ownSkin = [];
    if (!data.GameInfo.ownHunterSkin)  data.GameInfo.ownHunterSkin = [];
    if (!data.GameInfo.ownBuild)       data.GameInfo.ownBuild = [];
    if (typeof data.GameInfo.tian === 'undefined') data.GameInfo.tian = 0;
    if (typeof data.GameInfo.coin === 'undefined') data.GameInfo.coin = 0;

    // ========== 2. 普通皮肤全解锁 ==========
    const allSkinIds = [
        1001,1002,1003,1004,2001,2002,2003,3001,3002,3003,
        4001,4002,4003,5001,5002,5003,6001,6002,6003,
        7001,7002,8001,8002
    ];
    const existingIds = data.GameInfo.ownSkin.map(s => s.k);
    allSkinIds.forEach(id => {
        if (!existingIds.includes(id)) {
            data.GameInfo.ownSkin.push({ k: id, v: { cnt: 0, isUnlock: true } });
        }
    });
    data.GameInfo.ownSkin.forEach(skin => {
        if (skin.v) skin.v.isUnlock = true;
    });

    // ========== 3. 猎手皮肤全解锁 ==========
    const allHunterSkinIds = [
        10001,10002,10003,10004,10005,10006,10007,
        10008,10009,10010,10011,10012,10013,10014,10015
    ];
    const existingHunterIds = data.GameInfo.ownHunterSkin.map(s => s.k);
    allHunterSkinIds.forEach(id => {
        if (!existingHunterIds.includes(id)) {
            data.GameInfo.ownHunterSkin.push({ k: id, v: { cnt: 0, isUnlock: true } });
        }
    });
    data.GameInfo.ownHunterSkin.forEach(skin => {
        if (skin.v) skin.v.isUnlock = true;
    });

    // ========== 4. 金币/天币（只增不减） ==========
    setIfGreater(data.GameInfo, 'coin', randomInt(100000, 999999));
    setIfGreater(data.GameInfo, 'tian', randomInt(1000, 9999));

    // ========== 5. 道具修改（只增不减） ==========
    data.GameInfo.ownBuild.forEach(build => {
        if (build.k === 6666 || build.k === 6667) {
            if (build.v.cnt < 20) build.v.cnt = 20;
        } else if (build.k === 2999) {
            let target = randomInt(10000, 99999);
            if (build.v.cnt < target) build.v.cnt = target;
        } else {
            let target = randomInt(100, 999);
            if (build.v.cnt < target) build.v.cnt = target;
        }
    });

    // ========== 6. 登录天数做旧 ==========
    if (data.UserInfo) {
        let targetDays = randomInt(30, 90);
        if (typeof data.UserInfo.ld === 'undefined' || data.UserInfo.ld < targetDays) {
            data.UserInfo.ld = targetDays;
        }
    }
    if (data.NavigateInfo) {
        let targetLogin = randomInt(30, 90);
        if (typeof data.NavigateInfo.loginCnt === 'undefined' || data.NavigateInfo.loginCnt < targetLogin) {
            data.NavigateInfo.loginCnt = targetLogin;
        }
    }

    // ========== 7. 写回 ==========
    body.data = JSON.stringify(data);
    $done({ body: JSON.stringify(body) });
} else {
    $done({});
}
