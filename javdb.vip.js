/***********************************************

[rewrite_local]

# > JavDB_会员信息@感谢【chuididefeng】赞助的会员账号
^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}(:\d+)?\/api\/v\d\/movies\/\w+\/play url script-echo-response https://ddgksf2013.top/scripts/javdb.vip.js
# > JavDB_开屏广告@ddgksf2013
^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}(:\d+)?\/api\/v\d\/startup url script-response-body https://raw.githubusercontent.com/MrTlyer/js/refs/heads/main/JavDB.YY.js
# > JavDB_Tab广告@ddgksf2013
^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}(:\d+)?\/api\/v\d\/ads url script-response-body https://raw.githubusercontent.com/MrTlyer/js/refs/heads/main/JavDB.YY.js
# > JavDB_播放页@ddgksf2013
^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}(:\d+)?\/api\/v4\/movies url script-response-body https://raw.githubusercontent.com/MrTlyer/js/refs/heads/main/JavDB.YY.js
# > JavDB_用户页@ddgksf2013
^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}(:\d+)?\/api\/v\d\/users\? url script-response-body https://raw.githubusercontent.com/MrTlyer/js/refs/heads/main/JavDB.YY.js


[mitm]

hostname = api.hechuangxinxi.xyz, api.pxxgg.xyz, api.wwwuh5.cn, api.ujvnmkx.cn, jdforrepam.com, api.yijingluowangluo.xyz, api.ffaoa.com, apidd.*.com

***********************************************/



const WORKER_DOMAIN = "javdb.ddgksf2013.workers.dev";
const WORKER_URL = "https://" + WORKER_DOMAIN;

const reqUrl = $request.url;
const reqMethod = $request.method;
const proxyUrl = WORKER_URL + "/" + reqUrl;

const proxyHeaders = {
    "Host": WORKER_DOMAIN,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Encoding": "gzip, deflate, br"
};
if ($request.headers["jdsignature"]) {
    proxyHeaders["jdsignature"] = $request.headers["jdsignature"];
} else if ($request.headers["Jdsignature"]) {
    proxyHeaders["jdsignature"] = $request.headers["Jdsignature"];
}

const options = {
    url: proxyUrl,
    method: reqMethod,
    headers: proxyHeaders,
    timeout: 15000
};

if ($request.body && !["GET", "HEAD"].includes(reqMethod.toUpperCase())) {
    options.body = $request.body;
}

$task.fetch(options).then(
    response => {
        $done({
            status: "HTTP/1.1 " + (response.statusCode || 200),
            headers: response.headers,
            body: response.body
        });
    },
    reason => {
        $done({
            status: "HTTP/1.1 502 Bad Gateway",
            body: '{"error": "Worker Proxy Failed"}'
        });
    }
);
