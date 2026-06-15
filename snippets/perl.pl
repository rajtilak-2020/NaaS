use strict;
use warnings;
use LWP::UserAgent;
use JSON;

my $ua = LWP::UserAgent->new;
my $response = $ua->get('https://no.krajtilak.in/api/no');

if ($response->is_success) {
    my $data = decode_json($response->decoded_content);
    print "Excuse: " . $data->{reason} . "\n";
} else {
    die $response->status_line;
}