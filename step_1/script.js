// /////////////////////////////////////////////////////////////////////////////
// 
// 外部サイトのRSSを取得してサイトに表示してみよう
// -----------------------------------------------------------------------------
// Designer meets Programming
//
// Step 1 : RSSを1つ読み込んで表示してみよう！ 
// 
// /////////////////////////////////////////////////////////////////////////////

'use strict';

// google Feed APIの読み込み
google.load('feeds','1');

// -----------------------------------------------------------------------------
// 変数の宣言と代入
// -----------------------------------------------------------------------------
var RSSURL = 'https://news.google.com/news/feeds?ned=us&ie=UTF-8&oe=UTF-8&q=%E5%85%A5%E6%9C%AD&output=atom&num=30&hl=ja';
var CONTAINER = $('#cntr');
var feed;

// フィード読み込み後に実行させたい内容の定義
var feedCallBack = function(result){
	// feedCallBackの中でのみ使える変数
	var i;
	var entries,
		title,
		link;

	// RSSを読み込んでエラーが無かった場合の処理
	if(!result.error){
		entries = result.feed.entries;
		// ループ
		for(i=0; i<entries.length; i++){
			title = entries[i].title;
			link = entries[i].link;
			CONTAINER.append('<p><a href="'+link+'">'+title+'</a></p>');
		}
	}else{
		alert('読み込みに失敗しました ＼(＾0＾)／');
	};
}

// -----------------------------------------------------------------------------
// htmlの内容を
// -----------------------------------------------------------------------------
function onloaded(){
	// フィードオブジェクトの作成。同時に読み込みRSSのURLを渡す
	feed = new google.feeds.Feed(RSSURL);
	// フィードの読み込みを開始。同時に読み込み後に処理させたい関数を渡す。
	feed.load(feedCallBack);
};

// html読み込み後に実行されるように登録
window.onload = onloaded;
