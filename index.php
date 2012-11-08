<?php
/*
 * @title Route Drawer
 * @description Route Driver between navigator.geolocation.getCurrentPosition to end point using Google MAP v3 API
 *
 * This is just simple route driver. There is nothing special or important code line written by me!
 * Just in case, I'd like to put on Github because when I need something like this Github better than my local code archieve ;)
 * 
 * @author: Taner DOGAN (hello@tanerdogan.com) 
 */
?>

<style>
* {
	padding: 2px 0; 
	margin:0 auto;
}

#map_canvas{
	width:99%; 
	height:99%;
	background:#DBDBDB;
	border:1px solid #DBDBDB; 
	overflow:hidden;
}
</style>
    <script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=true"></script>
    <!-- include Google's AJAX API loader -->
    <script type="text/javascript" src="map.setup.js"></script>

	<!-- final point coords goes here -->
    <input type="hidden" name="final_point" id="final_point" size="250" value="36.886905,30.705702"/>
   
    <div id="map_canvas"></div>

    <script type="text/javascript">
        getNavGeoLocationFrom();    
    </script>

