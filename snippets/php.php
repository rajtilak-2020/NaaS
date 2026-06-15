<?php
$url = "https://no.krajtilak.in/api/no";
$response = file_get_contents($url);
if ($response !== false) {
    $data = json_decode($response, true);
    echo "Excuse: " . $data['reason'] . "\n";
} else {
    echo "Request failed.\n";
}
?>