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

// -----------------------------------------------------------------------------
// 変数の宣言と代入
var RSSURL = 'http://yokotakenji.me/log/?feed=rss2'; // RSSのURL
var CONTAINER = $('#cntr'); // 記事が入るhtmlタグ
var feed; // フィード機能 今は宣言だけ。

// -----------------------------------------------------------------------------
// フィード読み込み後に実行させたい内容の定義
var feedCallBack = function(result){
	// feedCallBackの中でのみ使える変数
	var i;
	// 変数を連続して宣言するときは","区切りでvarを省略できます。最後は必ず";"になるのに注意！
	var entries,
		title,
		link;

	// RSSを読み込んでエラーが無かった場合の処理
	if(!result.error){
		entries = result.feed.entries;
		// ループ (記事の数だけ)
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
// APIを読み込んだ後に実行したい内容を定義
var apiCallBack = function(){
	// フィードオブジェクトの作成。同時に読み込みRSSのURLを渡す
	feed = new google.feeds.Feed(RSSURL);
	// 読み込ませたい記事数を設定。デフォルトでは4
	feed.setNumEntries(10);
	// フィードの読み込みを開始。同時に読み込み後に処理させたい関数を渡す。
	feed.load(feedCallBack);
};

// -----------------------------------------------------------------------------
// API読み込み開始
// google Feed APIの読み込み
google.load('feeds','1',{callback:apiCallBack});
