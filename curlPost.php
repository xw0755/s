<?php
	 
	$ch = curl_init();
	// 2. 设置选项，包括URL
	
	$curlPost = "orgId=41401";
	//http://www.zzwater.com.cn/info/wsfwt/tsgg.aspx  郑州水
	//$_GET["url"] ,"http://218.28.136.21:8081/index.asp"
	curl_setopt($ch, CURLOPT_URL, 'http://www.95598.ha.sgcc.com.cn/jrtdxx');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POST, 1);//post提交方式

    curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);

	// 3. 执行并获取HTML文档内容
	$output = curl_exec($ch);
	
	print_r($output);
	
	
	// 4. 释放curl句柄
	curl_close($ch);
?>