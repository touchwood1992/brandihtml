<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$time = date('r');
echo "data: Hi this is johmss\n\n";
flush();
?>