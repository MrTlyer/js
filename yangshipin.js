/******************************
🧚🏻‍♂️项目名称：央视频 
🧚🏻‍♂️脚本作者：ios151
🧚🏻‍♂️特别说明：公益项目请勿盗用
🧚🏻‍♂️软件版本: 20240805最新版本
🧚🏻‍♂️注意事项：仅供学习 请勿传播售卖
***************************

[rewrite_local]

^http:\/\/(liveinfo|bkliveinfo|playvv)\.ysp\.cctv\.cn\/(playvinfo\?.+|.*) url script-request-header https://raw.githubusercontent.com/MrTlyer/js/main/yangshipin.js

# 解锁[电视]内会员 如果登录提示错误的话 手动屏蔽下面这条
&guid=[\w-]+&app_version=[\d\.]+&spadseg=\d&userid=(\d*)? url 302 &guid=f066be2cdf1c4f4893eb818de454313a&app_version=3.0.0.23522&spadseg=3&userid=234090757

# ^https:\/\/liveinfo\.ysp\.cctv\.cn\/ url script-request-header https://raw.githubusercontent.com/MrTlyer/js/main/yangshipin.js
# ^https:\/\/m\.yangshipin\.cn\/static\/\w/\w+\/index\.html$ url script-request-header https://raw.githubusercontent.com/MrTlyer/js/main/yangshipin.js
# > 央视频 去广告
^https?:\/\/cdn\.cmgadx\.com\/sdk\/pool\/.+\.json url reject-dict


[mitm]
hostname = *.ysp.cctv.cn, cdn.cmgadx.com

*******************************/

var iｉl='jsjiami.com.v7';const i1ll=iii1II;(function(i1l1l1,IlI1I,II11Ii,II11Il,IlI11,iIIIIl,II1Il){return i1l1l1=i1l1l1>>0x9,iIIIIl='hs',II1Il='hs',function(lilIlI,iIIIIi,iii1I1,II1Ii,i1ii){const IliI11=iii1II;II1Ii='tfi',iIIIIl=II1Ii+iIIIIl,i1ii='up',II1Il+=i1ii,iIIIIl=iii1I1(iIIIIl),II1Il=iii1I1(II1Il),iii1I1=0x0;const I1iIl1=lilIlI();while(!![]&&--II11Il+iIIIIi){try{II1Ii=-parseInt(IliI11(0xbc))/0x1*(parseInt(IliI11(0xc1))/0x2)+parseInt(IliI11(0xb7))/0x3*(-parseInt(IliI11(0xb4))/0x4)+parseInt(IliI11(0xc0))/0x5+-parseInt(IliI11(0xb9))/0x6+-parseInt(IliI11(0xb5))/0x7+parseInt(IliI11(0xb6))/0x8+parseInt(IliI11(0xbf))/0x9*(parseInt(IliI11(0xbd))/0xa);}catch(i1il){II1Ii=iii1I1;}finally{i1ii=I1iIl1[iIIIIl]();if(i1l1l1<=II11Il)iii1I1?IlI11?II1Ii=i1ii:IlI11=i1ii:iii1I1=i1ii;else{if(iii1I1==IlI11['replace'](/[PSpLrUIWlbMhFdgyQX=]/g,'')){if(II1Ii===iIIIIi){I1iIl1['un'+iIIIIl](i1ii);break;}I1iIl1[II1Il](i1ii);}}}}}(II11Ii,IlI1I,function(lI1Il1,lilIi1,IiilII,IliI1I,lI1Iii,i1li,li1II){return lilIi1='\x73\x70\x6c\x69\x74',lI1Il1=arguments[0x0],lI1Il1=lI1Il1[lilIi1](''),IiilII='\x72\x65\x76\x65\x72\x73\x65',lI1Il1=lI1Il1[IiilII]('\x76'),IliI1I='\x6a\x6f\x69\x6e',(0x17c83c,lI1Il1[IliI1I](''));});}(0x18200,0x1d923,Iii11l,0xc3),Iii11l)&&(iｉl=i1ll(0xbb));function iii1II(_0x1656b7,_0x3bcf93){const _0x26bb91=Iii11l();return iii1II=function(_0x528a1b,_0x55ebf2){_0x528a1b=_0x528a1b-0xb4;let _0x81d2b=_0x26bb91[_0x528a1b];if(iii1II['AmkWGw']===undefined){var _0x5e7775=function(_0x23f646){const _0xcb483b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x218522='',_0x56fc9f='';for(let _0x21045e=0x0,_0x11c688,_0x59d6dc,_0x337de8=0x0;_0x59d6dc=_0x23f646['charAt'](_0x337de8++);~_0x59d6dc&&(_0x11c688=_0x21045e%0x4?_0x11c688*0x40+_0x59d6dc:_0x59d6dc,_0x21045e++%0x4)?_0x218522+=String['fromCharCode'](0xff&_0x11c688>>(-0x2*_0x21045e&0x6)):0x0){_0x59d6dc=_0xcb483b['indexOf'](_0x59d6dc);}for(let _0x1e3e3a=0x0,_0x3108a0=_0x218522['length'];_0x1e3e3a<_0x3108a0;_0x1e3e3a++){_0x56fc9f+='%'+('00'+_0x218522['charCodeAt'](_0x1e3e3a)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x56fc9f);};iii1II['ZeGxwe']=_0x5e7775,_0x1656b7=arguments,iii1II['AmkWGw']=!![];}const _0x2962ca=_0x26bb91[0x0],_0x38d805=_0x528a1b+_0x2962ca,_0x42363e=_0x1656b7[_0x38d805];return!_0x42363e?(_0x81d2b=iii1II['ZeGxwe'](_0x81d2b),_0x1656b7[_0x38d805]=_0x81d2b):_0x81d2b=_0x42363e,_0x81d2b;},iii1II(_0x1656b7,_0x3bcf93);}let headers=$request[i1ll(0xb8)];function Iii11l(){const i1l1lI=(function(){return[iｉl,'PPSUjsjIliXamri.plcbodmUyQ.vWM7rQLFIgIhh==','mu56EgTLEq','mZeWvePVsLPY','x3zPzgvVx3fXx3zLCNnPB249ms4Wo192AwrLB19XCv92zxjZAw9UpteUmdTFDMLKzw9FCxfFDMvYC2LVBJ0XlJa7x3zPzgvVx3fXx3zLCNnPB249ms4Wo3nRzxK9kg51BgWPo3nRzxK9kg51BgWPo3nRzxK9kg51BgWPo3nRzxK9kg51BgWPo3nPzgvdB2rLpsHUDwXSktTZAwrLq29Kzt0OBNvSBcK7C2LKzunVzgu9kg51BgWPo3nPzgvdB2rLpsHUDwXSktTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTHy2nLC3nuB2TLBJ1frKyYqZfbota4m0iXotm5rKqXrKncnejbnte3mezenJTYzwzYzxnOvg9Rzw49rtyWruzdm0u0nJKWnKqXrdGZney1rJa0otbgrtC5mee7CMvMCMvZAfrVA2vUpuu2mevgqZnfndy5mdzemuq4mZrgnuyWndKWrKu3otbbo3jLzNjLC2HuB2TLBJ1fnJbfrKmZrtq2ota2rdfeodm0rJvgmdq5mezfnZKWqtTYzwzYzxnOvg9Rzw49rtyWruzdm0u0nJKWnKqXrdGZney1rJa0otbgrtC5mee7B3bLBKLKpuu0mtiZqtyZqJiWquzeqtbboey5nJK2mKiYodzcrdDfo29Wzw5jzd1fndeYm0e2m0iYmefgreeWqtHgoty5nJjcmJG2qKq3rtTVCgvUswq9rtqXmJnbnJncmJbbrKrbmee4rJK2otyYqJi4nKjen0u7B3bLBKLKpuu0mtiZqtyZqJiWquzeqtbboey5nJK2mKiYodzcrdDfo3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vYAwq9mJm0mdKWnZu3o3z1C2vZC2LVBJ1Rtve0mNf1wLDPEKf0DeLzENDIvg5ttNzOtujKtZq3ugfzm3zzlu02uNfZo3z1C2vZC2LVBJ1Rtve0mNf1wLDPEKf0DeLzENDIvg5ttNzOtujKtZq3ugfzm3zzlu02uNfZo3z1C2vZC2LVBJ1Rtve0mNf1wLDPEKf0DeLzENDIvg5ttNzOtujKtZq3ugfzm3zzlu02uNfZo3z1C2vZC2LVBJ1Rtve0mNf1wLDPEKf0DeLzENDIvg5ttNzOtujKtZq3ugfzm3zzlu02uNfZo3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5o3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5o3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5o3zWBgf0zM9YBt01o2D1Awq9zJa2nMjLmMnKzJfJngy0odKZzwi4mtHKztq1ndmXm2e7CwLTzwK9mZeYyZy1ndCZzdDJmdzMnwiYnMm0yMjHmdaWmdeZzde1yJe5','ntmYodLpsNrxCMS'].concat((function(){return['otK4mZmWEKX6EfLA','mZu1ndG2Ee55sLLy','nhnZCLjSCG','mta2mZG2n0DbEgvbzG','mtCXmZi3mM1jBwzuDG','mJe1otyXvM9Zq3vm'].concat((function(){return['AgvHzgvYCW','ndq3mJuYrMThzMT6','q29VA2LL','ANnQAwfTAs5JB20UDJC'];}()));}()));}());Iii11l=function(){return i1l1lI;};return Iii11l();};headers[i1ll(0xba)]=i1ll(0xbe),$done({'headers':headers});var version_ = 'jsjiami.com.v7';
