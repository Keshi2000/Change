// ============ 1. 数据模板兜底 ============
function InitUserData(data) {
    if (!data || typeof data !== "object") data = {};
    if (!data.bp || typeof data.bp !== "object") data.bp = {};
    if (!data.mt || typeof data.mt !== "object") data.mt = { "0": 0, "1": 0, "2": 0 };
    if (!data.ts || typeof data.ts !== "object") data.ts = {};
    if (!data.wbw || typeof data.wbw !== "object") data.wbw = { "c": 0, "s": 0 };
    if (!Array.isArray(data.usf)) data.usf = [];
    if (!Array.isArray(data._skill)) data._skill = [0,0,0,0,0,0];
    if (!Array.isArray(data.dskins)) data.dskins = [];
    if (!Array.isArray(data.ssii)) data.ssii = [0,0,0,0,0,0];
    if (!Array.isArray(data.ni)) data.ni = [[2, 2, 0]];
    if (!Array.isArray(data.pli)) data.pli = [];
    if (!Array.isArray(data.pi)) data.pi = [];
    if (!Array.isArray(data.ti)) data.ti = [];
    if (!Array.isArray(data.sf)) data.sf = [0,0,0,0,0,0];
    if (!Array.isArray(data.ssi)) data.ssi = [0,0,0,0,0,0];
    if (!Array.isArray(data.ps)) data.ps = [0, 1, 5, 4, 3, 2];
    if (!data.psi) data.psi = 4;
    if (!data.jl || typeof data.jl !== "object") data.jl = { "ipu": 0, "reg": 0, "ct": 0, "log": 0, "pid": 0, "cid": "" };
    if (!Array.isArray(data.key)) data.key = [1, 2, "Frog", 6];
    if (!Array.isArray(data.bz)) data.bz = [];
    if (!Array.isArray(data.bzl)) data.bzl = [];
    if (!Array.isArray(data.ci)) data.ci = [];
    if (!Array.isArray(data.mts)) data.mts = [];
    if (!Array.isArray(data.bc)) data.bc = [];
    if (!data.onl || typeof data.onl !== "object") data.onl = { "c": 0, "s": 0 };
    if (!Array.isArray(data.crd)) data.crd = [0, 0, 0, 0, 0];
    if (typeof data.bfp !== 'string') data.bfp = "1|26|25|jasb-0|tzzq-5|jdxs-0|wybl-0|qxbm-0|mjxw-0|dscj-0|ztlw-0|ptbs-2|ptjs-1|jrps-2|bnhq-0|qjcj-0|ywdj-0|jsmh-0|tgyj-0";
    return data;
}

// ============ 2. 随机工具函数 ============
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============ 3. 核心修改逻辑 ============
function Module(data, attach) {
    if (!data) return;
    data = InitUserData(data);

    function safeSet(obj, key, value) {
        if (typeof obj[key] === 'undefined' || obj[key] < value) obj[key] = value;
    }

    // ============ 生成随机数据 ============
    let randGold = randomInt(5000, 30158);
    let randFRA = randomInt(183, 818);
    let randWin = randomInt(100, 999);
    let randLose = randomInt(5, 50);
    let randCount = randomInt(200, 999);
    let randMVP = randomInt(500, 2000);
    let randLWin = randomInt(5, 99);
    let randDday = randomInt(30, 365);
    let timeOffset = randomInt(1000, 1600) * 24 * 60 * 60 * 1000;
    let targetTime = Date.now() - timeOffset;

    // ============ 基础资源 & 战绩 (随机) ============
    safeSet(data, 'gold', randGold);
    safeSet(data, 'fra', randFRA);
    safeSet(data, 'task', 10);
    safeSet(data, 'mvp', randMVP);
    safeSet(data, 'win', randWin);
    safeSet(data, 'nWin', randWin);
    safeSet(data, 'lose', randLose);
    safeSet(data, 'lWin', randLWin);
    safeSet(data, 'ld', 28);
    safeSet(data, 'count', randCount);
    safeSet(data, '_dday', randDday);

    // ============ 响应中有但脚本缺失的基础字段 ============
    safeSet(data, 'sti', 0);
    safeSet(data, 'bd', 0);
    safeSet(data, 'npd', -1);
    safeSet(data, 'np', 1);
    safeSet(data, 'bf', 0);
    safeSet(data, 'buser', 0);
    safeSet(data, 'jlMark', 0);
    safeSet(data, 'dvc', 0);
    safeSet(data, 'un', 1);
    safeSet(data, 'ucnd', 1);
    safeSet(data, 'fsu', 0);
    safeSet(data, 'ulvl', 1);
    safeSet(data, 'tld', 0);
    safeSet(data, 'atd', 0);
    safeSet(data, 'hec', 0);
    safeSet(data, 'ugm', 1);
    safeSet(data, '_st', 0);
    safeSet(data, 'sgc', 0);
    safeSet(data, 'sa', 0);
    safeSet(data, 'uplm', 1);
    safeSet(data, 'tcount', 0);
    safeSet(data, 'mngtn', 0);
    safeSet(data, 'mvc', 0);
    safeSet(data, 'ncu', 0);
    safeSet(data, 'bt', 0);
    safeSet(data, 'n2', 3);
    safeSet(data, 'mw', 30);
    safeSet(data, 'wdp', 1);
    safeSet(data, 'vst', 1);
    safeSet(data, 'gwr', 1);
    safeSet(data, 'rc', 0);
    safeSet(data, 'cmt', -1);
    safeSet(data, 'ppf', 0);
    safeSet(data, 'bys', 0);
    safeSet(data, 'nmc', 0);
    safeSet(data, 'bsl', 0);
    safeSet(data, 'cd', 0);
    safeSet(data, 'rhve', 0);
    safeSet(data, 'svt', 0);
    safeSet(data, 'gi', 0);
    safeSet(data, 'uppm', 0);
    safeSet(data, 'ucm', 0);
    safeSet(data, 'hep', 0);
    safeSet(data, 'pac', 0);
    safeSet(data, 'mst', 0);
    safeSet(data, 'lcad', 0);
    safeSet(data, 'sgcc', 0);
    safeSet(data, 'gn', 0);
    safeSet(data, 'pvs', 0);
    safeSet(data, 'diceCPCnt', 0);
    safeSet(data, 'gp', 20);
    safeSet(data, 'mrc', 0);
    safeSet(data, 'a2', 0);

    // ============ 字符串/特殊字段 ============
    safeSet(data, '_dv', '191');
    safeSet(data, 'ja', '');

    // ============ 皮肤系统 (使用最新响应数据) ============
    data.dskins = [-1, -1, -1];
    data.usf = [
        [0, 1, 30, 1, 45, 1, 50, 1, 99, 1, 99, 1, 99, 1],
        [0, 1, 40, 1, 45, 1, 50, 1, 99, 1, 99, 1, 99, 1],
        [0, 1, 12, 1, 50, 1, 70, 1, 99, 1, 99, 1, 99, 1],
        [0, 1, 24, 1, 46, 1, 66, 1, 99, 1, 99, 1, 99, 1],
        [0, 1, 30, 1, 60, 1, 55, 1, 99, 1, 99, 1, 99, 1],
        [0, 1, 15, 1, 40, 1, 99, 1, 99, 1, 99, 1, 99, 1]
    ];
    data.ssii = [6, 6, 6, 6, 6, 6];
    data.dskinc = 57;
    data.compound = [150, 82, 0];

    // ============ 道具/建筑 (300-800随机) ============
    const bpKeys = ["longrange", "ice", "meow", "troll", "doorLevUp", "repair", "diceCP", "energyhood", "guillotine", "smoney", "spell", "particlea", "solenoid", "splitter", "barb", "entrapment", "dice"];
    bpKeys.forEach(key => {
        if (key === 'meow') {
            safeSet(data.bp, key, 20);
        } else if (key === 'doorLevUp') {
            safeSet(data.bp, key, 1);
        } else if (key === 'dice') {
            safeSet(data.bp, key, 20);
        } else {
            safeSet(data.bp, key, randomInt(300, 800));
        }
    });

    // ============ 技能 & 特权 ============
    for(let i=0; i<data._skill.length; i++) safeSet(data._skill, i, 99);
    data.ps = [0, 1, 5, 4, 3, 2];
    safeSet(data, 'psi', 4);
    safeSet(data, 'f1', 15);
    safeSet(data, 'nc', 53);
    safeSet(data, 'lBed', 3);
    safeSet(data, 'bg', 270);
    safeSet(data, 'bds', 0);

    // ============ 关键标志位 (使用最新响应数据) ============
    data.uv = true;
    data.uvt = false;
    data.uvd = false;
    data.to = true;
    data.cgl = true;
    data.hefw = false;
    data.wdfw = true;
    data.iso = true;
    data._isUnlockCompound = 1;
    data.c6 = 0;

    // ============ bfp 称号字段 (按最新数据写死) ============
    data.bfp = "1|26|25|jasb-0|tzzq-5|jdxs-0|wybl-0|qxbm-0|mjxw-0|dscj-0|ztlw-0|ptbs-2|ptjs-1|jrps-2|bnhq-0|qjcj-0|ywdj-0|jsmh-0|tgyj-0";

    // ============ 黑店道具补齐 (ID 0-26 全部设为数量20, 顺序随机) ============
    let bsArr = [];
    for (let i = 0; i <= 26; i++) {
        bsArr.push(i + "-20");
    }
    bsArr.sort(() => Math.random() - 0.5);
    data._bs = bsArr.join("|");

    // ============ 关卡写死 (按最新数据) ============
    data.ni = [[85, 88, 0]];

    while (data.pli.length < 8) data.pli.push([0, 0, 3, 1]);
    for (let i = 0; i < data.pli.length; i++) {
        let arr = data.pli[i];
        if (Array.isArray(arr) && arr.length >= 4) {
            arr[2] = 99;
            arr[3] = 1;
        }
    }

    while (data.pi.length < 3) data.pi.push([0, 0, 3, 0]);
    for (let i = 0; i < data.pi.length; i++) {
        let arr = data.pi[i];
        if (Array.isArray(arr) && arr.length >= 4) arr[2] = 99;
    }

    while (data.ti.length < 2) data.ti.push([0, 0, 3, 0]);
    for (let i = 0; i < data.ti.length; i++) {
        let arr = data.ti[i];
        if (Array.isArray(arr) && arr.length >= 4) arr[2] = 99;
    }

    // sf / ssi / mt / ts / wbw 全拉满
    data.sf = data.sf.map(v => Math.max(v, 99));
    data.ssi = data.ssi.map(v => Math.max(v, 99));
    for (let k in data.mt) data.mt[k] = Math.max(data.mt[k], 99);
    for (let k in data.ts) data.ts[k] = Math.max(data.ts[k], 99);
    for (let k in data.wbw) data.wbw[k] = Math.max(data.wbw[k], 99);

    // ============ 时间戳伪装 (1000-1600天随机) ============
    data.dc = targetTime;
    data._sld = targetTime;
    data.ldy = targetTime;
    if (attach && attach.data) {
        attach.data.lo = targetTime;
        if (attach.ct) attach.ct = targetTime;
        safeSet(attach.data, 'fl', 25);
        safeSet(attach.data, 'll', 26);
        safeSet(attach.data, 'cl', 26);
        safeSet(attach.data, 'mt', 999);
    }
}

// ============ 4. 主拦截入口（纯响应拦截） ============
if (typeof $response !== "undefined") {
    let url = $request.url;
    let body = $response.body;
    try {
        let ddm = JSON.parse(body);
        ddm.code = 0; ddm.msg = "Success";

        if (/user\/login/.test(url)) {
            if (!ddm.data) ddm.data = {};
            if (!ddm.data.userData) ddm.data.userData = {};
            if (!ddm.data.attach) ddm.data.attach = { data: {} };
            ddm.userType = 1;
            ddm.data.userType = 1;
            Module(ddm.data.userData, ddm.data.attach);
        } else if (/user\/data/.test(url)) {
            if (ddm.data && ddm.data.userData) {
                Module(ddm.data.userData, ddm.data.attach);
            }
        }
        $done({ body: JSON.stringify(ddm) });
    } catch (e) {
        console.log("猛鬼宿舍响应解析失败:", e);
        $done({});
    }
} else {
    $done({});
}
