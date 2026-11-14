// ============================================================
// iios.me Loon 抓包脚本 v2（手机端，不用电脑）
// 用途：用 Loon 拦截 www.iios.me 的请求，抓到点“立即签到”那一次的
//       URL、方法、请求体、以及全部签名/凭证头
// 状态：2026-11-14 v2。v1 只存 Authorization / Cookie，
//       但 HAR 里的 main.601ba55d.js 证实请求是 WASM 签名的：
//       每次请求带 X-Signature 和 X-Timestamp（JS 里各出现 1 次），
//       请求体是加密后的 d，静态重放未必能用。
//       所以 v2 必须连同 X-Signature / X-Timestamp / Content-Type
//       一起存下来，明天抓到后先实测一次重放，再决定怎么写签到脚本。
//       不要只发 URL + body 给我，签名头缺了就没法测。
// 注意：今天（2026-11-14）已经手动签到了，今天抓不到。
//       下一次机会：明天 2026-11-15 早上 9 点自动签到之前。
// 安全：脚本里不要放账号密码，只保存抓到的请求信息到 Loon 本地。
// ============================================================

// ---------- 手动查看已抓到的结果 ----------
// 在 Loon 里手动运行这个脚本（不带 $request 时走这里），
// 会把上次抓到的内容用通知发出来。
if (typeof $request === "undefined") {
  const url = $persistentStore.read("iios_cap_url") || "(还没抓到)";
  const method = $persistentStore.read("iios_cap_method") || "";
  const body = $persistentStore.read("iios_cap_body") || "";
  const auth = $persistentStore.read("iios_cap_auth") || "";
  const cookie = $persistentStore.read("iios_cap_cookie") || "";
  const sig = $persistentStore.read("iios_cap_sig") || "";
  const ts = $persistentStore.read("iios_cap_ts") || "";
  const ctype = $persistentStore.read("iios_cap_ctype") || "";
  $notification.post("iios.me 抓包结果", method + " " + url, "body: " + (body || "(空)"));
  if (sig) $notification.post("iios.me 签名", "X-Signature 已保存", sig.slice(0, 200));
  if (ts) $notification.post("iios.me 签名", "X-Timestamp 已保存", ts.slice(0, 200));
  if (ctype) $notification.post("iios.me 请求头", "Content-Type: " + ctype, "");
  if (auth) $notification.post("iios.me 凭证", "Authorization 已保存", auth.slice(0, 200));
  if (cookie) $notification.post("iios.me 凭证", "Cookie 已保存", cookie.slice(0, 200));
  console.log("[iios-capture] " + method + " " + url + " body=" + body + " sig=" + sig + " ts=" + ts);
  $done();
} else {
  // ---------- http-request 抓包 ----------
  const url = $request.url || "";
  const method = $request.method || "";
  const headers = $request.headers || {};
  const body = $request.body || "";

  // 跳过静态资源，只看页面和接口请求
  const isStatic = /\.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|ico)(\?|$)/i.test(url);
  const isHomeOnly = url === "https://www.iios.me/" && method === "GET";
  if (isStatic || isHomeOnly) {
    $done({});
  } else {
    const getHeader = (name) => headers[name] || headers[name.toLowerCase()] || "";
    const auth = getHeader("Authorization");
    const cookie = getHeader("Cookie");
    const sig = getHeader("X-Signature");
    const ts = getHeader("X-Timestamp");
    const ctype = getHeader("Content-Type");
    $persistentStore.write(url, "iios_cap_url");
    $persistentStore.write(method, "iios_cap_method");
    $persistentStore.write(body, "iios_cap_body");
    $persistentStore.write(auth, "iios_cap_auth");
    $persistentStore.write(cookie, "iios_cap_cookie");
    $persistentStore.write(sig, "iios_cap_sig");
    $persistentStore.write(ts, "iios_cap_ts");
    $persistentStore.write(ctype, "iios_cap_ctype");
    $persistentStore.write(JSON.stringify(headers), "iios_cap_headers");
    $persistentStore.write(new Date().toISOString(), "iios_cap_time");
    console.log("[iios-capture] " + method + " " + url + " body=" + body + " sig=" + sig + " ts=" + ts);
    // 通知只做提示，完整内容存在 $persistentStore 里，手动运行本脚本可查看
    $notification.post("iios.me 抓到一条请求", method + " " + url.slice(0, 100), "点签到后，手动运行本脚本查看完整结果（含 X-Signature / X-Timestamp）");
    $done({});
  }
}

// ============================================================
// Loon 配置（在 Loon App 里加）：
//
// 1) 先开 MitM，否则 HTTPS 的请求体和请求头看不到：
//    Loon > 设置 > MitM > 开启 MitM，安装并信任证书
//    （iOS 设置 > 通用 > 关于本机 > 证书信任设置里信任 Loon 证书）
//    MitM 主机名里加：www.iios.me
//
// 2) 加抓包脚本（二选一）：
//    A. 文件方式：把本文件放进 iCloud 云盘 > Loon > Scripts
//       （注意是复数 Scripts，Hu 在 2026-11-14 确认文件夹名是 Scripts；
//        不是“我的 iPhone”下的 Loon 文件夹；放进去后若还选不到，
//        先点一下文件等 iCloud 云朵消失，再彻底退出 Loon 重进，
//        并确认 Loon 设置里 iCloud 自动同步已打开，文件名须正好是
//        iios-loon-capture.js，不能带 .txt 后缀或空格）
//       再在 Loon > 配置 > 脚本 > 添加：类型 http-request，
//       匹配 ^https://www\.iios\.me/.*$ ，脚本位置选 Local，选本文件。
//    B. 更省事（不用管文件夹）：Loon > 配置 > 脚本 > 右上角 + >
//       新建脚本，名字写 iios-loon-capture，把本文件代码全选复制
//       粘贴进去保存，再添加 http-request，脚本位置选 Local，
//       就能选到刚新建的这个。
//
// 3) 明天 2026-11-15 早上 9 点自动签到前：
//    开 Loon（VPN 开启），用 Safari 打开 https://www.iios.me/#/points
//    确认已登录，点“立即签到”，等成功提示
//    收到“抓到一条请求”通知后，在 Loon 里手动运行本脚本一次，
//    把通知里显示的 URL、方法、请求体、X-Signature、X-Timestamp、
//    Authorization / Cookie 发给 Muse，Muse 先实测一次重放，
//    再决定签到脚本怎么写。
//    抓完后记得在 Loon 里关掉 / 删除这条 http-request，避免一直弹通知。
// ============================================================
