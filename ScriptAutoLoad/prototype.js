var al = {};
al.path = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/#project/mcpe/script/Code test.js";
al.read, al.content = "";

if(new java.io.File(al.path).exists() == true) {
	al.brfr = new java.io.BufferedReader(new java.io.FileReader(al.path));
	while((al.read = al.brfr.readLine()) != null)
		al.content += al.read + "\n";
	eval(al.content);
	al.brfr.close();
	print("[Script Auto Load] 스크립트 적용됨.")
}else{
	print("[Script Auto Load] 입력한 위치에 스크립트가 없습니다.");
}
