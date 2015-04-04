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
        popupWindow = new android.widget.PopupWindow();
        //TODO: Implements this function
    }}));
}

construct(com.mojang.minecraftpe.MainActivity.currentMainActivity.get());