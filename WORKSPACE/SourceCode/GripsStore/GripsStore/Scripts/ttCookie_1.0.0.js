// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// ' ﾌｧｲﾙ名：ttCookie_1.0.0.js
// ' 備　考：ｸｯｷｰ処理
// ' 作成日：2012/09/12 ... T.Takamura
// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
////////////////////////////////////////////////////////////////////////////
// ｸｯｷｰへ保存
//      argment     ... key		[ 保存ｷｰ		]
//					... val		[ 値 ]
//
var JSC_APP_NAME = 'SETIA';
//
var JSC_COOKIE_ARRAY_PARAM_SEP = "\v";
//
function setCookie(key, val) {
    key = JSC_APP_NAME + "_" + key;
    var cokies = null;
    var cokie = "";
    var cokiesep = "";
    var itemsep = "";
    var posi = 0;
    var encodeValue = encodeURI(val);

    // ｸｯｷｰを取得
    cokies = expCookie();

    // ｸｯｷｰ位置の取得
    if ((posi = getCookiePosi(key, cokies)) > -1) {
        // 設定
        cokies[posi].VAL = encodeValue;
    } else {
        // 作成
        posi = cokies.length;
        //
        cokies[posi] = new Object();
        cokies[posi].KEY = key;
        cokies[posi].VAL = encodeValue;
    }

    // 保存
    for (posi = -1; ++posi < cokies.length;) {
        document.cookie = cokies[posi].KEY + "=" + cokies[posi].VAL + ";expires=" + new Date("2999/12/31").toGMTString() + ";path=/"
        //
        cokiesep = ";";
        itemsep = " ";
    }
}
////////////////////////////////////////////////////////////////////////////
// ｸｯｷｰの取得
//      argment     ... key		[ ｷｰ		]
function getCookie(key) {
    key = JSC_APP_NAME + "_" + key;
    var cokies = null;
    var posi = 0;

    // ｸｯｷｰを取得
    cokies = expCookie();

    // ｸｯｷｰ位置の取得
    if ((posi = getCookiePosi(key, cokies)) > -1) {
        // 設定
        return decodeURI(cokies[posi].VAL);
    } else {
        return ""
    }
}
////////////////////////////////////////////////////////////////////////////
// ｸｯｷｰ展開
//      argment     ... none
//		returns		... ｸｯｷｰ情報配列
//							.KEY
//							.VAL
function expCookie() {
    var cokie = document.cookie.split("; ");
    var cokies = new Array();
    var cokiei = null;
    var item = null;
    var ix = 0;

    // ｸｯｷｰ情報を全て展開
    for (ix = -1; ++ix < cokie.length;) {
        // ｱｲﾃﾑに展開
        item = cokie[ix].split("=");
        if (item.length >= 2) {
            // ｱｲﾃﾑｵﾌﾞｼﾞｪｸﾄ
            cokiei = new Object();
            cokiei.KEY = item[0];
            cokiei.VAL = item[1];
            cokies[cokies.length] = cokiei;
        }
    }

    // Exit 
    return cokies;
}
////////////////////////////////////////////////////////////////////////////
// ｸｯｷｰ位置の取得
//      argment     ... key				[ 検索ｷｰ			]
//						cokies			[ 検索ﾘｽﾄ		]
//		returns		... -1	: なし
//						以外	: 検索ﾘｽﾄ位置
function getCookiePosi(key, cokies) {
    var ix = -1;

    for (; ++ix < cokies.length;) {
        if (cokies[ix].KEY == key) {
            return ix;
        }
    }

    return -1;
}
//////////////////////////////////////////////////////////////////////////
// -----------------------------------------------------------------
// - 関数名：配列ﾊﾟﾗﾒｰﾀの取得
// - 引　数：sCookieID      ... ｸｯｷｰID
// - 戻り値：なし
// - 備　考：なし
// -----------------------------------------------------------------
function jscGetArrayParam(sCookieID) {
    if ((sParam = getCookie(sCookieID)) != "") {
        return sParam.split(JSC_COOKIE_ARRAY_PARAM_SEP);
    } else {
        return new Array();
    }
}
// -----------------------------------------------------------------
// - 関数名：配列ﾊﾟﾗﾒｰﾀの取得
// - 引　数：sCookieID      ... ｸｯｷｰID
// -         iNo            ... ﾌｨｰﾙﾄﾞ番号
// - 戻り値：ﾌｨｰﾙﾄﾞ番号に該当するﾊﾟﾗﾒｰﾀ
// - 備　考：なし
// -----------------------------------------------------------------
function jscGetArrayParamIX(sCookieID, iNo) {
    var sParam = jscGetArrayParam(sCookieID);
    //
    return (sParam.length >= iNo ? sParam[iNo] : "");
}
// -----------------------------------------------------------------
// - 関数名：配列ﾊﾟﾗﾒｰﾀの設定
// - 引　数：sCookieID      ... ｸｯｷｰID
// -       ：sParam         ... 保存するﾊﾟﾗﾒｰﾀ
// - 戻り値：なし
// - 備　考：なし
// -----------------------------------------------------------------
function jscSetArrayParam(sCookieID, sParam) {
    var sStrParam = "";
    //
    sStrParam = sParam.join(JSC_COOKIE_ARRAY_PARAM_SEP);
    //
    setCookie(sCookieID, sStrParam);
}
// -----------------------------------------------------------------
// - 関数名：配列ﾊﾟﾗﾒｰﾀの設定
// - 引　数：sCookieID      ... ｸｯｷｰID
// -       ：sParam         ... ﾌｨｰﾙﾄﾞ番号
// -       : sVal           ... 値
// - 戻り値：なし
// - 備　考：なし
// -----------------------------------------------------------------
function jscSetArrayParamIX(sCookieID, iNo, sVal) {
    var sParam = jscGetArrayParam(sCookieID);
    //
    if (sParam.length <= iNo) {
        sParam = jscResizeArray(sParam, iNo + 1);
    }
    //
    sParam[iNo] = sVal;
    //
    jscSetArrayParam(sCookieID, sParam);
}
// -----------------------------------------------------------------
// - 関数名：配列の拡張
// - 引　数：sArray         ... 拡張する配列
// -       ：iCount         ... 配列数
// - 戻り値：なし
// - 備　考：なし
// -----------------------------------------------------------------
function jscResizeArray(sArray, iCount) {
    var sResult = new Array();
    //
    for (var ix = 0; ix < iCount; ix++) {
        if (ix < sArray.length) {
            sResult[ix] = sArray[ix];
        } else {
            sResult[ix] = "";
        }
    }
    //
    return sResult;
}
//////////////////////////////////////////////////////////////////////////