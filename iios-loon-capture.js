// ============================================================
// iios.me Loon 抓包脚本（手机端，不用电脑）
// 用途：用 Loon 拦截 www.iios.me 的请求，抓到点“立即签到”那一次的
//       URL、方法、请求体、Authorization / Cookie
// 状态：2026-11-14 新增。浏览器 DevTools 两次都只录到首页，
//       这次改用 Loon 在手机上直接抓。
// 注意：今天（2026-11-14）已经签到了，今天抓不到。
//       明天早上 9 点自动签到前再抓，或者先暂停一天自动签到白天抓。
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
  $notification.post("iios.me 抓包结果", method + " " + url, "body: " + (body || "(空)"));
  if (auth) $notification.post("iios.me 凭证", "Authorization 已保存", auth.slice(0, 200));
  if (cookie) $notification.post("iios.me 凭证", "Cookie 已保存", cookie.slice(0, 200));
  console.log("[iios-capture] " + method + " " + url + " body=" + body);
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
    const auth = headers["Authorization"] || headers["authorization"] || "";
    const cookie = headers["Cookie"] || headers["cookie"] || "";
    $persistentStore.write(url, "iios_cap_url");
    $persistentStore.write(method, "iios_cap_method");
    $persistentStore.write(body, "iios_cap_body");
    $persistentStore.write(auth, "iios_cap_auth");
    $persistentStore.write(cookie, "iios_cap_cookie");
    $persistentStore.write(new Date().toISOString(), "iios_cap_time");
    console.log("[iios-capture] " + method + " " + url + " body=" + body);
    // 通知只做提示，完整内容存在 $persistentStore 里，手动运行本脚本可查看
    $notification.post("iios.me 抓到一条请求", method + " " + url.slice(0, 100), "点签到后，手动运行本脚本查看完整结果");
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
// 2) 加抓包脚本：
//    Loon > 配置 > 脚本 > 添加
//    类型：http-request
//    匹配：^https://www\.iios\.me/.*$
//    脚本：选本文件 iios-loon-capture.js
//
// 3) 明天早上 9 点自动签到前：
//    开 Loon（VPN 开启），用 Safari 打开 https://www.iios.me/#/points
//    确认已登录，点“立即签到”，等成功提示
//    收到“抓到一条请求”通知后，在 Loon 里手动运行本脚本一次，
//    把通知里显示的 URL、方法、请求体、凭证头名字发给 Muse，
//    Muse 再把它们填进 iios-loon-checkin.js
//    抓完后记得在 Loon 里关掉 / 删除这条 http-request，避免一直弹通知。
// ============================================================
