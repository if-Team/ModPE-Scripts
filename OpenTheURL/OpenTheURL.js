/*
 * Copyright 2015 ChalkPE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var lastURL = "http://cafe.naver.com/minecraftpe";

/**
 * 레이아웃을 만듭니다
 */
function init(){
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function(){
			var button = new android.widget.Button(ctx);
			button.setText("OPEN");
			button.setOnClickListener(new android.view.View.OnCLickListener({
				onClick: function(v){
					/*
					var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
					intent.setData(android.net.Uri.parse(lastURL));
					ctx.startActivity(intent);
					*/
					
		            var web = new android.webkit.WebView(ctx);
		            web.getSettings().setJavaScriptEnabled(true);
				    web.loadUrl(lastURL);
				    
		            new android.app.AlertDialog.Builder(ctx).setView(web).show();
				}
			}));
			
			var window = new android.widget.PopupWindow(button);
		    window.setWindowLayoutMode(-2, -2);
		    window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
		    window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.CENTER, dp(64), dp(16));
		    
			print("© 2015 ChalkPE. All rights reserved.");
		}
	}));
}

/**
 * 문자열에서 URL을 찾습니다
 * @param {String} string - 문자열
 */
function find(string){
	//URL에는 띄어쓰기가 포함되지 않아요
	string.split(" ").forEach(function(str){
		try{
			var url = new java.net.URL(str);
			lastURL = str;
		}catch(e){
			if(e instanceof java.net.MalformedURLException){
				//not a URL
			}
		}
	});
}

/**
 * DPI를 픽셀로 변환합니다
 * @param {Number} dips - DPI 값
 * @returns 픽셀 값
 */
function dp(dips){
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

var chatHook = find;
init();