// /////////////////////////////////////////////////////////////////////////////
// 
// 外部サイトのRSSを取得してサイトに表示してみよう
// -----------------------------------------------------------------------------
// Designer meets Programming
//
// Step 2 : 複数のRSSを読み込んで表示してみよう！ 
// 
// /////////////////////////////////////////////////////////////////////////////

'use strict';

// -----------------------------------------------------------------------------
// 変数の宣言と代入
var RSSURL = [
	'http://yokotakenji.me/log/?feed=rss2',
	'http://news.google.com/news?ned=us&ie=UTF-8&oe=UTF-8&q=javascript&output=atom&num=30&hl=ja',
	'http://news.google.com/news?ned=us&ie=UTF-8&oe=UTF-8&q=flash&output=atom&num=30&hl=ja'
];
var CONTAINER = $('#cntr');
var feeds = [];

// -----------------------------------------------------------------------------
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
// APIを読み込んだ後に実行したい内容を定義
var apiCallBack = function(){
	var i;
	for(i=0; i<RSSURL.length; i++){
		// フィードオブジェクトの作成。同時に読み込みRSSのURLを渡す
		feeds[i] = new google.feeds.Feed(RSSURL[i]);
		// フィードの読み込みを開始。同時に読み込み後に処理させたい関数を渡す。
		feeds[i].load(feedCallBack);
	}
};

// -----------------------------------------------------------------------------
// API読み込み開始
google.load('feeds','1',{callback:apiCallBack});
