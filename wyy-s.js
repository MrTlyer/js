/*
 *
 *
#!name= 网易云svip会员
#!desc= 共享网易云svip会员
#!homepage = https://apps.apple.com/app/id590338362
#!icon= https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/e8/1b/2de81bfd-29a0-d067-63c3-38315cc1661a/AppIcon-1x_U007emarketing-0-9-0-0-85-220-0.png/460x0w.webp
#!date = 2025-11-10 00:00:00
#===================================
#⚠️【免责声明】
#-----------------------------------
#1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
#2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
#3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
#4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
#5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
#6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
#7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

[Rule]
DOMAIN,iadmat.nosdn.127.net,REJECT
DOMAIN,iadmatapk.nosdn.127.net,REJECT
DOMAIN,iadmusicmat.music.126.net,REJECT
DOMAIN,iadmusicmatvideo.music.126.net,REJECT
DOMAIN,ipv4.music.163.com,REJECT
DOMAIN,ipv6.music.163.com,REJECT

[Rewrite]
^https?://interface.*\.music\.163\.com/eapi/ad/get reject
^https?://interface.*\.music\.163\.com/eapi/ad/config/get reject
^https?://interface.*\.music\.163\.com/eapi/ad/iyunIds reject
^https?://interface.*\.music\.163\.com/eapi/ad/prefetch/select reject
^https?://interface.*\.music\.163\.com/eapi/ad/loading/current reject

^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(ocpc\/)?ad\/ mock-response-body data-type=text
^https?:\/\/interface\d?\.music\.163\.com\/eapi\/(?:delivery\/(batch-)?deliver|moment\/tab\/info\/|side-bar\/mini-program\/music-service\/account|yunbei\/account\/entrance\/) reject-dict
^https?:\/\/interface\d?\.music\.163\.com\/eapi\/(?:community\/friends\/fans-group\/artist\/group\/|mine\/applet\/redpoint|music\/songshare\/text\/recommend\/|resniche\/position\/play\/new\/|resniche\/tspopup\/show|resource\/comments?\/musiciansaid\/|user\/sub\/artist) reject-dict
^https?:\/\/interface\d?\.music\.163\.com\/eapi\/(?:ios\/version|mlivestream\/entrance\/playpage\/|link\/position\/show\/strategy|link\/scene\/show\/resource|v1\/content\/exposure\/comment\/banner\/) reject-dict
^https?:\/\/interface\d?\.music\.163.com\/w?e?api\/search\/default mock-response-body data-type=text
^https?:\/\/interface\d?\.music\.163\.com\/w?eapi\/(?:activity\/bonus\/playpage\/time\/query|resource-exposure\/|search\/(?:chart\/|rcmd\/keyword\/|specialkeyword\/)) reject-dict
^https:\/\/interface\d\.music\.163\.com\/eapi\/my\/podcast\/tab\/recommend reject-dict

[Script]
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/playermode\/ script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=皮肤
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/search\/(?:complex\/page|complex\/rec\/song\/get|song\/list\/page) script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=歌曲、听书
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/v3\/song\/detail script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=歌曲、听书
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/song\/(?:chorus|enhance\/|play\/|type\/detail\/get) script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=歌曲、听书
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/(?:v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=歌曲、听书
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=等级
http-request ^https?:\/\/interface\d?\.music\.163\.com\/w?e?api\/(homepage\/|v6\/)?playlist\/(?!(?:delete|subscribe|unsubscribe)) script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=首页歌单
http-request ^https?:\/\/interface\d?\.music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query script-path=https://he2o.vercel.app/Resource/-Rewrite/anyehttp/wyy-s.js, timeout=60, tag=音质

[Mitm]
hostname = interface*.music.163.com
*
*
*/






var WYYHeaders = $request.headers;
WYYHeaders['cookie'] = 'MUSIC_U=00EBC39D51E8CA2FE12A82041048DCC285656C2DAE0EAEBA21CCBE99C3E1495920FF129978F1D38AF6F6B9CF70D864537D637FC5043AE90BA0A5CF346625EDCE3A64B137D8EB91ADEB67B7CCA94DAEAED14557D2B1C675447C8F6AED591BDA2E79CB71C06466C15028EEADFF2074C67FF0BCCA429CF2BEFFF59483BC4DF69B9EBA6C7DC45F81E650B4AF37D5B23B979777EA69E556CFB512B8284319CD5A9ADBB078894164BD4C528F3D34584A3165BB77535ECA659CC6BB0C1A63B611ABE5136D0AB7AD58477DA5DF80B17DCB6E601B1E71FAE48F826901C955686A1BF7019ED39BCCFFF8C238EC8709522788F446E88CA4219FFF294C7BA25D2BE9B818DB7C5E289834F9A9EB8A237905A163FE06D4C20ED8C266E4034BD3BDAEF4E0C027748F30AD235B0E08B6A698B2A6478C312F4A6C2909C19188B47363E468D5555C4FE27CA27CAC2C0E50A4318D1C28E1D799767754FED05929A2CA8E498E81F10025373C510E3E38252046848B2C687E3A9D05; caid={"lastIyunId":"2754556bbb705f231eca3fd72596225d","iyunId":"1b7c26bf23845b6fadecb7151a9ef37c","iyunVersion":"20250325","lastIyunVersion":"20230330"}; buildver=6352; sDeviceId=00000000000000000000000000000000; channel=distribution; idfa=00000000-0000-0000-0000-000000000000; packageType=release; appver=9.4.0; deviceId=00000000000000000000000000000000; EVNSM=1.0.0; os=iPhone OS; osver=26.0; machineid=iPhone17.2; NMCID=jnvwlk.1721320815000.01.3; appkey=IuRPVVmc3WWul9fT; idfv=00000000-0000-0000-0000-000000000000; URS_APPID=B4300E3591BDEC0BDAD47C5B75AA09E2A1A402C0FEBDE5407986A72C8CE16DF5B6293116B121D6872A9FEA6913295501; NMDI=Q1NKTQcBDACpwlhh4qjU5lexqyeVAAAAbZiUDNNCRngAWM2rEgug/WjKgNVQj/xthQgCnQDkMe+BlTWRTXWFgjgWN+glqEGrkcrlNfCDMz93tohH8Qylg8SfY75c1x16qZaiYvB++3K7vPs++grPNlMDe+zFTWy0oZVDQcLVOEfzFL1lMn8eVOE3QjGclQdPuWKM2gHbkYVNxP5QrC9f75m/8Rnyw+c9MJPQ1ds=';

$done({headers : WYYHeaders});