var ScriptName = "Code: Delete crash report";
var Version = "0.1v";
//
/*
—————Change Log—————
0.1v(20150228)
	-정식 버전

—————Plan—————
(☆: Plan)
(★: Working)
이런 간단한 스크립트에 계획따윈 없다.

—————DUMMY—————
(사용하지 않는 Code나 임시Code 보관용)
없음
*/

/**
*Apache License, Version 2.0
*
*아파치 라이선스 버전 2.0
*
*==============================
*Copyright (c) <2015> <CodeInside>
*==============================
*
*Apache LicenseVersion 2.0, January 2004
*
*Apache License 버전 2.0(본 라이선스)의 적용을 받음. 이 파일을 사용하기 위해서는 반드시 본 라이선스를 따라야 합니다.본 라이선스의 사본은 다음 사이트에서 구할 수 있습니다.
*
*http://www.apache.org/licenses/LICENSE-2.0
*
*관련 법규나 서면 동의에 의해 구속되지 않는 한, 본 라이선스에따라 배포되는 소프트웨어는 어떠한 보증이나 조건도 명시적으로나 묵시적으로 설정되지 않는  “있는 그대로”의 상태로 배포됩니다. 본 라이선스가 허용하거나 제한하는 사항을 규정한 문언에 대해서는 라이선스를 참조하십시오.
*
*/
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
//메인 sdcard 경로 구하기
var MAIN_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory());
var target = new Array();

//sdcard폴더의 모든 파일을 검사
for each(var e in MAIN_DIR.list()) {
	//이름이 blocklauncher_crash_로 시작하는 파일 찾기
	if(e.split("_")[0] == "blocklauncher" && e.split("_")[1] == "crash"){
		//찾으면 target배열에 등록
		target.push(e);
	}
}

//target배열의 파일들을 삭제
for each(var e in target){
	new java.io.File(MAIN_DIR, "/" + e).delete();
}

//삭제한 갯수가 1개 이상이면 메시지 출력
if(target.length > 0){
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		android.widget.Toast.makeText(ctx, target.length + "개의 크래쉬 리포트를 삭제했습니다.", android.widget.Toast.LENGTH_LONG).show();
}}))}