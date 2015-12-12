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

/**
 * @type {android.widget.PopupWindow}
 */
var popupWindow = null;

/**
 * @param {android.content.Context} ctx
 */
function construct(ctx){
    ctx.runOnUiThread(new java.lang.Runnable({run: function(){
        var button = new android.widget.Button(ctx);
        button.setText("Patch");
        button.setOnClickListener(new android.view.View.OnClickListener({onClick: function(){
            //TODO: Add views to AlertDialog
            new android.app.AlertDialog.Builder(ctx).show();
        }}));

        popupWindow = new android.widget.PopupWindow(button);
        popupWindow.setWindowLayoutMode(-2, -2);
        popupWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, Math.floor(16 * ctx.getResources().getDisplayMetrics().density), 0);
    }}));
}

construct(com.mojang.minecraftpe.MainActivity.currentMainActivity.get());

