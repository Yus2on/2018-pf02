$(window).resize(function(){
	var container = document.getElementById('map');
	var options = {
		center: new daum.maps.LatLng(37.471262, 127.048802), //지도의 중심좌표.
		level: 3 //지도의 레벨(확대, 축소 정도)
	};
	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	map.setDraggable(false);
	map.setZoomable(false);
	
	var clusterer = new daum.maps.MarkerClusterer({
		map: map,
		gridSize: 35,
		averageCenter: true,
		minLevel: 6,
		disableClickZoom: true,
		styles: [{
				width : '53px', height : '52px',
				background: 'url(cluster.png) no-repeat',
				color: '#fff',
				textAlign: 'center',
				lineHeight: '54px'
		}]
	});
	var marker = new daum.maps.Marker({
		position: new daum.maps.LatLng(37.471262, 127.048802)
	});
	clusterer.addMarker(marker);
}).trigger("resize");



