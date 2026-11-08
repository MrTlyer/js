/*
 *
 *
脚本功能：Vip+会员画质+去广告,页面优化
软件版本：++
下载地址：苹果商店下载
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]

# > 芒果TV,Vip+会员画质+去广告,页面优化
^https?:\/\/.*mgtv.com.*(GetUserInfo|module\/list\?_support|app\/bdboot|pullReleaseInfo|floor\/detail|video\/source|entry\?_support).*$ url script-response-body https://raw.githubusercontent.com/MrTlyer/js/refs/heads/main/mgtv.js
^https?:\/\/mobile-stream\.api\.mgtv\.com\/v1\/video\/source\? url script-request-header https://raw.githubusercontent.com/MrTlyer/js/refs/heads/main/mgtk.js
^https?://mobile.da.mgtv.com\/m\/page url reject

[mitm] 
hostname = *mgtv.com,hb-boom.api.mgtv.com,*.api.mgtv.com,mobile-stream.api.mgtv.com,hb-boom.api.mgtv.com,mobile-stream.api.mgtv.com,nuc.api.mgtv.com,111.31.104.108, 111.31.104.*, 111.31.104.96, *.api.mgtv.com, iphone.v0.mgtv.com, api.data.mgtv.com, *.*.mgtv.*,
*
*


*
*
*/
