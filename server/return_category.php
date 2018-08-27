<?php
if (strpos($_SERVER['HTTP_REFERER'],'4200') === false) {
		echo "access denied";
} else {

	require_once("dbconnect.php");
	$result = $mysqli->query("SELECT id, category, name, author, picture, short_description, raiting, `date` FROM instructions WHERE category='".$_GET['category']."'");
	$posts = [];
	$rows = $result->num_rows;
	for ($i = 0 ; $i < $rows ; ++$i)
	{
		$instruction = $result->fetch_row();
		$posts[] = [
			"post_id" => $instruction[0],
			"category" => $instruction[1],
			"title" => $instruction[2],
			"author" => $instruction[3],
			"picture" => $instruction[4],
			"description" => $instruction[5],
			"raiting" => $instruction[6],
			"date" => $instruction[7]
		];
	}
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $posts ); 

}
?>