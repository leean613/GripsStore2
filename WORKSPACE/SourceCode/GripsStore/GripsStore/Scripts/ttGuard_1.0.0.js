// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// ' ﾌｧｲﾙ名：ttGuard_1.0.0.js
// ' 備　考：高村のｶﾞｰﾄﾞ処理
// ' 作成日：2014/03/26 ... T.Takamura
// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function TtGuard(param)
{
	var m_fClick = null;
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' ｶﾞｰﾄﾞの表示
    // ' 引　数 : bOpacity0	... true : 透明	false:不透明 (省略可)
	// '		  fClick	... ｸﾘｯｸ時ｺｰﾙ関数 (省略可)
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.show = function(bOpacity0, fClick)
	{
		createGuard( bOpacity0, fClick );
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' ｳｪｲﾄ表示
    // ' 引　数 : なし
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.showWait = function( sImgPath )
	{
	    var html = "";
        //
		createGuard( false, null );
		//
		if( $('#ttm_guard_wait').length == 0 )
		{
		    html += "<div id='ttm_guard_wait'>&nbsp;</div>";
			//
			$(html).appendTo( $('body') );
			//
			setCenter( 'ttm_guard_wait' );
		}
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' ｳｪｲﾄ非表示 (画像のみ ｶﾞｰﾄﾞを消去する場合は、destory)
    // ' 引　数 : なし
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.destoryWait = function()
	{
		$('#ttm_guard_wait').remove();
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' 中央配置
    // ' 引　数 : id		... 中央に配置するｴﾚﾒﾝﾄのID
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.setCenter = function( id )
	{
		setCenter( id );
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' 中央配置
    // ' 引　数 : id		... 配置する要素ID
	// '		  top		... true : 上に配置	flase:下に配置
	// '		  left		... true : 左揃え	flase:右揃え
	// '		  topadd	... 上位置補正 (ずらす値)
	// '		  leftadd	... 右位置補正 (ずらす値)
	// '		  base		... 配置のﾍﾞｰｽとする要素ID
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.setLocation = function( id, top, left, topadd, leftadd, base )
	{
        var $base  = $('#' + base);
		var	bPosi   = $base.offset();
        var bWidth  = $base.outerWidth(true);
        var bHeight = $base.outerHeight(true);
        //
        var $mbox   = $('#' + id);
        var tWidth  = $mbox.outerWidth(true);
        var tHeight = $mbox.outerHeight(true);
		//
		bPosi.top += topadd;
		if( top )
		{
			$mbox.css( 'top',  (bPosi.top - tHeight) + 'px' );
		}else{
			$mbox.css( 'top',  (bPosi.top + bHeight) + 'px' );
		}
		//
		bPosi.left += leftadd;
		if( left )
		{
			$mbox.css( 'left', bPosi.left + 'px' );
		}else{
			$mbox.css( 'left', (bPosi.left + bWidth - tWidth) + 'px' );
		}
		//
		$mbox.css( 'z-index', parseInt( $('#ttm_guard').css('z-index') ) + 1 );
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' 配置位置設定 (ﾌﾚｰﾑを意識)
    // ' 引　数 : oParam
    // '            ... FrameID     ( BaseIDがﾌﾚｰﾑ内の要素の場合      )
    // '            ... BaseID      ( 表示位置ﾍﾞｰｽ位置                )
    // '            ... ID          ( 位置を設定する要素ID             )
    // '            ... Top         ( true : 上に配置	flase:下に配置   )
    // '            ... TopMove     ( 表示位置から上にずらす値(px)     )
    // '            ... Left        ( true : 左揃え	    flase:右揃え )
    // '            ... LeftMove    ( 表示位置から右にずらす値(px)     )
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.setLocationForFrame = function( oParam )
	{
	    var $frame = $('#' + oParam.FrameID);
	    var bFramePosi = $frame.offset();
        //
	    var $base   = $frame.contents().find('#' + oParam.BaseID);
	    var bPosi   = $base.offset();
        var bWidth  = $base.outerWidth(true);
        var bHeight = $base.outerHeight(true);
        //
        var $mbox = $('#' + oParam.ID);
        var tWidth  = $mbox.outerWidth(true);
        var tHeight = $mbox.outerHeight(true);
        //
        bPosi.top += bFramePosi.top + oParam.TopMove;
        if (oParam.Top)
		{
			$mbox.css( 'top',  (bPosi.top - tHeight) + 'px' );
		}else{
			$mbox.css( 'top',  (bPosi.top + bHeight) + 'px' );
		}
		//
        bPosi.left += bFramePosi.left + oParam.LeftMove;
		if (oParam.Left)
		{
			$mbox.css( 'left', bPosi.left + 'px' );
		}else{
			$mbox.css( 'left', (bPosi.left + bWidth - tWidth) + 'px' );
		}
		//
		$mbox.css( 'z-index', parseInt( $('#ttm_guard').css('z-index') ) + 1 );
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' ｸﾘｯｸ処理取得
    // ' 引　数 : なし
    // ' 戻り値 : 現在設定されているｷｬﾝｾﾙ処理
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.getClick = function ()
	{
	    return m_fClick;
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' 前面へ移動
    // ' 引　数 : id			... 移動する要素ID
    // '         fCancel    ... ｸﾘｯｸ時ｺｰﾙ関数 (省略可能)
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.setForce = function ( id, fClick )
	{
        var $guard  = $('#ttm_guard');
        var $mbox   = $('#' + id);
		//
		$mbox.css( 'z-index', parseInt( $guard.css('z-index') ) + 1 );
	    //
		if (fClick != undefined)
		{
		    $('#ttm_guard').off('click');
		    m_fClick = fClick;
		    $('#ttm_guard').on('click', m_fClick);
        }
        //
		$mbox.focus();
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' 背面へ移動
    // ' 引　数 : id			... 移動する要素ID
    // '         fCancel    ... ｸﾘｯｸ時ｺｰﾙ関数 (省略可能)
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.setBackground = function (id, fClick)
	{
        var $guard  = $('#ttm_guard');
        var $mbox   = $('#' + id);
		//
		$mbox.css( 'z-index', parseInt( $guard.css('z-index') ) - 1 );
	    //
		if (fClick != undefined)
		{
		    $('#ttm_guard').off('click');
		    m_fClick = fClick;
		    $('#ttm_guard').on('click', m_fClick);
		}
	    //
		$guard.focus();
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' ｳｪｲﾄ消去
    // ' 引　数 : なし
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.destoryWait = function()
	{
		$('#ttm_guard_wait').remove();
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' ｶﾞｰﾄﾞの消去
    // ' 引　数 : なし
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	this.destory = function()
	{
		if( m_fClick != null )
		{
			$('#ttm_guard').off( 'click' );
		}
		m_fClick = null;
		$('#ttm_guard').off('keydown');
		$('#ttm_guard_wait').remove();
		$('#ttm_guard').remove();
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' ｶﾞｰﾄﾞの表示
    // ' 引　数 : bOpacity0	... true : 透明	false:不透明 (省略可)
	// '		  fClick	... ｸﾘｯｸ時ｺｰﾙ関数 (省略可)
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	function createGuard(bOpacity0, fClick)
	{
		var html_guard = '';
		var opacity = "";
		//
		if ( $('body').length > 0 && $('#ttm_guard').length == 0 )
		{
		    opacity = (bOpacity0 ? 'ttm_guard_opacity0' : 'ttm_guard_opacity50');
		    //
			// HTML ( ｶﾞｰﾄﾞ )
		    html_guard += '<div id="ttm_guard" class="' + opacity + '"">&nbsp</div>';
			//
			// ｶﾞｰﾄﾞの表示
			$(html_guard).appendTo( $('body') );
			//
			// ｻｲｽﾞをﾎﾞﾃﾞｨに合わせる
			$('#ttm_guard')
				.css('width',  "100%")
				.css('height', "100%");
		    // ｷｰﾀﾞｳﾝｲﾍﾞﾝﾄ
			$('#ttm_guard').on('keydown', OnTTGuardKeyDown);
		} else {
		    if( bOpacity0 )
		    {
		        $('#ttm_guard').removeClass('ttm_guard_opacity50');
		        $('#ttm_guard').addClass('ttm_guard_opacity0');
            } else {
		        $('#ttm_guard').removeClass('ttm_guard_opacity0');
		        $('#ttm_guard').addClass('ttm_guard_opacity50');
		    }
        }
	    //
        // ｶﾞｰﾄﾞｸﾘｯｸの再設定
		$('#ttm_guard').off('click');
		if (fClick != undefined && fClick != null)
		{
		    m_fClick = fClick;
		    $('#ttm_guard').on('click', m_fClick);
		}else{
		    m_fClick = null;
		    $('#ttm_guard').off('click');
		}
	    //
	    // ﾌｫｰｶｽをｶﾞｰﾄﾞへ
		$('#ttm_guard').focus();
	}
    // '''''''''''''''''''''''''''''''''''''''''''''
    // ' 中央配置
    // ' 引　数 : id		... 中央に配置するｴﾚﾒﾝﾄのID
    // ' 戻り値 : なし
    // '''''''''''''''''''''''''''''''''''''''''''''
	function setCenter( id )
	{
		if( $('#ttm_guard').length > 0 && $('#' + id).length > 0 )
		{
			var $guard  = $('#ttm_guard');
			var gWidth  = $guard.outerWidth(true);
			var gHeight = $guard.outerHeight(true);
			//
			var $mbox = $('#' + id);
			var mWidth = $mbox.outerWidth(true);
			var mHeight = $mbox.outerHeight(true);
			//
			// 位置の設定
			if (gHeight > mHeight) 
			{
				$mbox.css('top', ((gHeight - mHeight) / 2) + 'px');
			}else{
				$mbox.css('top', '0px');
			}
			if (gWidth > mWidth) 
			{
				$mbox.css('left', ((gWidth - mWidth) / 2) + 'px');
			} else {
				$mbox.css('left', '0px');
			}
			// z-indexの指定
			$mbox.css( 'z-index', parseInt( $guard.css('z-index') ) + 1 );
		}
	}
    // -----------------------------------------------------------------
    // - 関数名：ｷｰﾀﾞｳﾝ
    // - 引　数： evt
    //              .keyCode        ... 押されたｷｰｺｰﾄﾞ
    // - 戻り値：true : ｲﾍﾞﾝﾄ続行	false : ｲﾍﾞﾝﾄ中止
    // - 備　考：なし
    // -----------------------------------------------------------------
	function OnTTGuardKeyDown(evt)
	{
	    var bNext = false;
	    try
	    {
	        bNext = evt.keyCode == 116 ? true : false;
	    }
	    catch (ex)
	    {
	    }
	    finally
	    {
	        return bNext;
	    }
	}

}
var ttGuard = new TtGuard();