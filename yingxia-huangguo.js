// 黄果短剧 · 映匣（Yingxia / TVBox）JS 源
// 站点：https://huangguoai.com  （HGhub 客户端的上游）
//
// 数据全部走一个 RPC 信封：
//   POST https://huangguoai.com/api/edge/request
//   body: {"method":"GET","path":"/api/videos?page=1&size=20","body":"","content_type":""}
//   响应: {"status":1,"data": <真正的 JSON>}   （status!=1 时 data 是提示语）
//   无签名、无设备指纹，只要 Referer + 普通浏览器 UA。
//
// 接口：
//   /api/videos?page=&size=                     首页信息流
//   /api/videos/category/{slug}?page=&size=     分类（ai-duanju / ai-manju / ai-huanlian / ai-mogai）
//   /api/ranks/{hot|recommend|potential}        榜单（一次 20 条，无分页）
//   /api/search?q=&page=&size=                  搜索
//   /api/videos/{id}                            详情（含 episodes[]）
//   /api/videos/{id}/play?ep=N&page_texts=0     取第 N 集的签名 m3u8
//
// 封面：pic.drleao.cn 上是 AES-128-CBC 密文（key "f5d965df75336270" / iv "97b60394abc2fbe1"），
// 映匣只会按 URL 取图，所以走本地 CFRelay 的 /aesimg 解密后再交给播放器。
//
// 播放：m3u8 带 auth_key 签名，直连即可播（分片走同一个 CDN），header 里带 Referer 更稳。

const HG_SITE = "https://huangguoai.com";
const HG_EDGE = HG_SITE + "/api/edge/request";
const HG_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15";
const HG_HEADERS = {
  "User-Agent": HG_UA,
  "Referer": HG_SITE + "/",
  "Origin": HG_SITE,
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "zh-CN,zh;q=0.9",
  "Content-Type": "application/json"
};

// 本地中继（同目录 relay/CFRelay.swift，监听 127.0.0.1:8848）
const HG_RELAY = "http://127.0.0.1:8848";
const HG_RELAY_ON = { value: null }; // null 未探测 / true 可用 / false 不可用

const HG_CHANNELS = [
  { slug: "ai-duanju", name: "AI成人短剧" },
  { slug: "ai-manju", name: "AI成人漫剧" },
  { slug: "ai-huanlian", name: "AI换脸" },
  { slug: "ai-mogai", name: "AI魔改" }
];

const HG_RANKS = [
  { key: "hot", name: "热播榜" },
  { key: "recommend", name: "推荐榜" },
  { key: "potential", name: "潜力榜" }
];

const HG_PAGE_SIZE = 20;

// ==================== 网络 ====================

function hgRelayAvailable() {
  if (HG_RELAY_ON.value !== null) return HG_RELAY_ON.value;
  var ok = false;
  try {
    var ping = req(HG_RELAY + "/ping", { timeout: 1500 });
    ok = !!ping && ping.code === 200 && String(ping.content || "").indexOf("ok") >= 0;
  } catch (error) {
    ok = false;
  }
  HG_RELAY_ON.value = ok;
  return ok;
}

// 信封调用：path 是 /api/xxx 形式
function hgEdge(path) {
  var payload = JSON.stringify({
    method: "GET",
    path: path,
    body: "",
    content_type: ""
  });
  var res = null;
  try {
    res = req(HG_EDGE, {
      method: "POST",
      headers: HG_HEADERS,
      body: payload,
      timeout: 20000
    });
  } catch (error) {
    throw new Error("请求失败：" + path + "（" + (error && error.message ? error.message : error) + "）");
  }
  if (!res || res.code !== 200) {
    throw new Error("接口 HTTP " + (res ? res.code : "无响应") + "：" + path);
  }
  var text = String(res.content == null ? "" : res.content);
  var outer;
  try { outer = JSON.parse(text); } catch (error) {
    throw new Error("接口返回不是 JSON：" + text.slice(0, 160));
  }
  if (!outer || outer.status !== 1) {
    throw new Error("接口提示：" + ((outer && outer.msg) || "未知错误"));
  }
  return outer.data;
}

// ==================== 映射 ====================

function hgPic(url) {
  var value = String(url == null ? "" : url).trim();
  if (!value) return "";
  if (!/^https?:\/\//i.test(value)) return "";
  if (hgRelayAvailable()) return HG_RELAY + "/aesimg?u=" + encodeURIComponent(value);
  return value;
}

function hgDate(text) {
  var value = String(text == null ? "" : text);
  if (!value) return "";
  return value.length >= 10 ? value.slice(5, 10) : value;
}

function hgVod(item) {
  var id = item && (item.id != null ? item.id : item.video_id);
  var name = String((item && item.title) || "").trim();
  var eps = parseInt((item && item.episode_count) || (item && item.total_episodes) || 0, 10);
  var remarks = [];
  if (eps > 0) remarks.push("全 " + eps + " 集");
  if (item && item.is_finished) remarks.push("完结");
  if (item && item.score) remarks.push("★" + item.score);
  return {
    vod_id: String(id == null ? "" : id),
    vod_name: name,
    vod_pic: hgPic(item && (item.cover || item.titlepic)),
    vod_remarks: remarks.join(" · ") || hgDate(item && item.new_at)
  };
}

function hgList(data) {
  var items = (data && (data.items || data.list || data.data)) || [];
  var list = [];
  for (var i = 0; i < items.length; i++) {
    if (!items[i]) continue;
    list.push(hgVod(items[i]));
  }
  return list;
}

function hgPager(data, page, listLength) {
  var pg = (data && data.pagination) || {};
  var current = parseInt(pg.page, 10) || page;
  var pages = parseInt(pg.pages, 10) || 1;
  return {
    page: current,
    pagecount: pages,
    limit: parseInt(pg.size, 10) || listLength || HG_PAGE_SIZE,
    total: parseInt(pg.total, 10) || 0
  };
}

// ==================== SPIDER ====================
var SPIDER = {
  init: function (ext) { return true; },

  home: function (filter) {
    var classes = [{ type_id: "latest", type_name: "最新" }];
    for (var r = 0; r < HG_RANKS.length; r++) {
      classes.push({ type_id: "rank:" + HG_RANKS[r].key, type_name: HG_RANKS[r].name });
    }
    for (var c = 0; c < HG_CHANNELS.length; c++) {
      classes.push({ type_id: "cate:" + HG_CHANNELS[c].slug, type_name: HG_CHANNELS[c].name });
    }
    return { class: classes };
  },

  homeContent: function (filter) {
    var classes = this.home(filter).class;
    var list = [];
    try {
      list = hgList(hgEdge("/api/videos?page=1&size=" + HG_PAGE_SIZE));
    } catch (error) {
      // 首页失败不阻塞分类
    }
    return { class: classes, list: list };
  },

  category: function (tid, pg, filter, extend) {
    var typeId = String(tid == null ? "latest" : tid).trim() || "latest";
    var page = Math.max(1, parseInt(pg, 10) || 1);

    // 榜单：一次性 20 条，没有分页
    if (typeId.indexOf("rank:") === 0) {
      var kind = typeId.slice(5);
      var ranked = hgList(hgEdge("/api/ranks/" + encodeURIComponent(kind)));
      return { list: ranked, page: 1, pagecount: 1, limit: ranked.length, total: ranked.length };
    }

    var path;
    if (typeId.indexOf("cate:") === 0) {
      path = "/api/videos/category/" + encodeURIComponent(typeId.slice(5)) +
        "?page=" + page + "&size=" + HG_PAGE_SIZE;
    } else {
      path = "/api/videos?page=" + page + "&size=" + HG_PAGE_SIZE;
    }
    var data = hgEdge(path);
    var list = hgList(data);
    var pager = hgPager(data, page, list.length);
    return { list: list, page: pager.page, pagecount: pager.pagecount, limit: pager.limit, total: pager.total };
  },

  search: function (wd, quick, page) {
    var keyword = String(wd || "").trim();
    var p = Math.max(1, parseInt(page, 10) || 1);
    if (!keyword) return { list: [], page: p, pagecount: p };
    var data = hgEdge("/api/search?q=" + encodeURIComponent(keyword) + "&page=" + p + "&size=" + HG_PAGE_SIZE);
    var list = hgList(data);
    var pager = hgPager(data, p, list.length);
    return { list: list, page: pager.page, pagecount: pager.pagecount, limit: pager.limit, total: pager.total };
  },

  detail: function (ids) {
    var id = String(Array.isArray(ids) ? ids[0] : (ids || "")).trim();
    if (!id) throw new Error("缺少视频 ID");
    var item = hgEdge("/api/videos/" + encodeURIComponent(id));

    var episodes = (item && item.episodes) || [];
    var rows = [];
    for (var i = 0; i < episodes.length; i++) {
      var ep = episodes[i];
      if (!ep) continue;
      var num = parseInt(ep.ep_num, 10);
      if (!num) continue;
      var label = String(ep.title || "").trim();
      // 有些站把整段剧情塞进标题，太长的截断
      if (!label || label.length > 24) label = "第 " + num + " 集";
      rows.push(label + "$" + id + "|ep:" + num);
    }
    if (!rows.length) {
      var count = parseInt((item && item.episode_count) || 0, 10);
      for (var n = 1; n <= count; n++) rows.push("第 " + n + " 集$" + id + "|ep:" + n);
    }
    if (!rows.length) rows.push("正片$" + id + "|ep:1");

    var info = [];
    if (item && item.description) info.push(String(item.description).trim());
    if (item && item.tags && item.tags.length) info.push("标签：" + item.tags.join(" / "));
    if (item && item.author && item.author.name) info.push("作者：" + item.author.name);
    if (item && item.episode_count) info.push("集数：" + item.episode_count);

    var vod = {
      vod_id: id,
      vod_name: String((item && item.title) || "").trim() || ("黄果短剧 " + id),
      vod_pic: hgPic(item && item.cover),
      vod_content: info.join("\n"),
      vod_play_from: "黄果",
      vod_play_url: rows.join("#")
    };
    return { list: [vod] };
  },

  play: function (flag, id) {
    var raw = String(id || "").trim();
    if (!raw) throw new Error("缺少播放参数");

    // 直链直接放行
    if (/^https?:\/\//i.test(raw)) {
      return {
        parse: 0,
        url: raw,
        header: { "User-Agent": HG_UA, "Referer": HG_SITE + "/" }
      };
    }

    var vodId = raw;
    var ep = 1;
    var at = raw.indexOf("|ep:");
    if (at >= 0) {
      vodId = raw.slice(0, at);
      ep = parseInt(raw.slice(at + 4), 10) || 1;
    } else if (raw.indexOf("ep:") === 0) {
      throw new Error("缺少视频 ID");
    }

    var data = hgEdge("/api/videos/" + encodeURIComponent(vodId) +
      "/play?ep=" + ep + "&page_texts=0");
    var url = String((data && (data.video_url || data.video_url_hevc)) || "").trim();
    if (!url) throw new Error("接口没有返回播放地址（第 " + ep + " 集）");

    return {
      parse: 0,
      url: url,
      header: {
        "User-Agent": HG_UA,
        "Referer": HG_SITE + "/"
      }
    };
  }
};

export default SPIDER;
