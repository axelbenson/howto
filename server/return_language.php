<?php
if (strpos($_SERVER['HTTP_REFERER'],'4200') === false) {
		echo "access denied";
} else {

	$language = file_get_contents($_GET['language'].".json");
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo $language ; 

}
?>