##############################################
# $Id: myUtilsTemplate.pm 7570 2015-01-14 18:31:44Z rudolfkoenig $
#
# Save this file as 99_myUtils.pm, and create your own functions in the new
# file. They are then available in every Perl expression.

package main;

use strict;
use warnings;
use POSIX;

sub
myUtils_Initialize($$)
{
  my ($hash) = @_;
}

# Enter you functions below _this_ line.
sub Kalenderstart ($)
{
	my ($Ereignis) = @_;
	my @Ereignisarray = split(/.*:\s/,$Ereignis);
	my $Ereignisteil1 = $Ereignisarray[1];
	my @uids = split(/;/,$Ereignisteil1);
	foreach my $uid (@uids) {
		my $Kalendertext = fhem("get Abfallkalender summary uid=$uid 1");
		if ($Kalendertext =~ /Biomüll/) {
			fhem("set Bio_Tonne ja");
			system("Bio_Tonne");
			print "Bio_Tonne";
		}
		if ($Kalendertext =~ /Restmüll/) {
			fhem("set Restmuell_Tonne ja");
		}
		if ($Kalendertext =~ /Altpapier/) {
			fhem("set Papier_Tonne ja");
		}
		if ($Kalendertext =~ /Gelber Sack/) {
			fhem("set Gelber_Sack ja");
		}
	}
}
sub Kalenderende ($) {
	my ($Ereignis) = @_;
	my @Ereignisarray = split(/.*:\s/,$Ereignis);
	my $Ereignisteil1 = $Ereignisarray[1];
	my @uids = split(/;/,$Ereignisteil1);
	foreach my $uid (@uids) {
		my $Kalendertext = fhem("get Kalender_Christian summary uid=$uid 1");
		if ($Kalendertext =~ /Biomüll/) {
			fhem("set Bio_Tonne nein");
			system("Bio_Tonne");
			print "Bio_Tonne";
		}
		if ($Kalendertext =~ /Restmüll/) {
			fhem("set Restmuell_Tonne nein");
		}
		if ($Kalendertext =~ /Altpapier/) {
			fhem("set Papier_Tonne nein");
		}
		if ($Kalendertext =~ /Gelber Sack/) {
			fhem("set Gelber_Sack nein");
		}
	}
}

1;
