/*
JAVASCRIPT CODE FOR KMETIJE WEBPAGE

Using jQuery, leaflet, leaflet.labels
*/

$(function(){
	
	// |-------|
	// |FILTERS|
	// |-------|
	
	// MENUS AND BUTTONS
	// -----------------
	
	// OPEN MENUS

	$('.category').on('mouseover', function() {
		$(this).children('.menu').css("display", "block");
		$(this).addClass('borderHoover');
	});
	
	// CLOSE MENUS
	
	$('.category').on('mouseout', function() {
		$(this).children('.menu').css("display", "none");
		$(this).removeClass('borderHoover');
	});
	
	// CLEAR SELECTION BUTTON
	
	$('#clearSelection').on('click', function() {
		$('#selection').children().remove();
		$('.column h3').css("color", "");
		$('.subcategories li').css("color", "");
	});
	
	// ADD ITEMS TO SELECTION
	// ----------------------
	
	var $selection = $('#selection');
	
	$('.subcategories li').on('click', function() {
		var $item = $(this);
		var $itemText = $item.text();
		
		// CHECK IF THE ITEM IS ALREADY IN SELECTION
		
		var closeFunction = false;
		
		$('.itemName').each(function() {
			if ($itemText == $(this).text()) {
				$(this).parent().remove();
				closeFunction = true;
				return false;
			}										
		});
		if (closeFunction){
			$item.css("color", "");
			return false;
		}

		// ADD COLOR TO ITEM
		
		$item.css("color", "deeppink");
		$item.parent().prev().css("color", "");
		
		// REMOVE SUBCATEGORY IN SELECTION THAT CONTAINS CLICKED ITEM
		
		var $subcategoryText = $(this).parent().prev().text();
		$selection.children().children().each(function() {
			if ($(this).text() == $subcategoryText) {
				$(this).parent().remove();
				$item.siblings().css("color", "");
			}
		});
		
		// INSERT ITEM INSIDE SELECTION
		
		$selection.append('<div class="item"><h4 class="itemName">'+ $itemText +'</h4><div class="close"><h4>X</h4></div></div>');
		
		// REMOVE ITEMS FROM SELECTION
	
		$('.close').on('click', function() {
			if ($(this).prev().text() == $itemText) {$item.css("color", "");}
			$(this).parent().remove();
			$menu.removeClass('active').addClass('menu');
			$menu.parent().removeClass('borderHoover');
		});
	});

	// ADD SUBCATEGORIES TO SELECTION
	// ------------------------------
	
	$('.column h3').on('click', function() {
		var $subCategory = $(this);
		var $subCategoryText = $subCategory.text();
		
		// CHECK IF SUBCATEGORY IS ALREADY IN SELECTION
		
		var closeFunction = false;
		
		$('.categoryName').each(function() {
			if ($subCategoryText == $(this).text()) {
				$(this).parent().remove();
				closeFunction = true;
				return false;
			}										
		});
		if (closeFunction) {
			$subCategory.css("color", "");
			$subCategory.next().children().css("color", "");
			return false;
		}													
		
		// ADD COLOR TO ITEM
		
		$subCategory.css("color", "deeppink");
		$subCategory.next().children().css("color", "deeppink");
		
		// REMOVE ITEMS IN SELECTION THAT BELONG TO SUBCATEGORY
		
		$(this).next().children().each(function() {
			var $itemSubText = $(this).text();
			$selection.children().children().each(function() {
				if ($(this).text() == $itemSubText) {$(this).parent().remove();}
			});
		});
		
		// INSERT SUBCATEGORY INSIDE SELECTION
		
		$selection.append('<div class="item"><h4 class="categoryName">'+ $subCategoryText +'</h4><div class="close"><h4>X</h4></div></div>');
		
		// REMOVE SUBCATEGORIES FROM SELECTION
	
		$('.close').on('click', function() {
			if ($(this).prev().text() == $subCategoryText) {
				$subCategory.css("color", "");
				$subCategory.next().children().css("color", "");
			}
			$(this).parent().remove();
			$menu.removeClass('active').addClass('menu');
			$menu.parent().removeClass('borderHoover');
		});
	});
	
	// |---|
	// |MAP|
	// |---|
	
	// CREATE MAP
	// ----------
	
	var map = L.map( 'map', {center: [46.12, 14.82], minZoom: 8, maxZoom: 13, zoom: 8});

	// SETUP AJAX METHODS
	
	$.ajaxSetup({beforeSend: function(xhr){
		if (xhr.overrideMimeType) {xhr.overrideMimeType("application/json");}
	}});
	
	// BORDER LAYER
	
	var border;
	
	var borderStyle = {"clickable": false, "color": "deeppink", "weight": 5, opacity: 1.0};
	$.getJSON("Layers/border.geojson", function(data) {
		border = L.geoJson(data, {style: borderStyle});
		map.addLayer(border);
	});
	
	// STREET LAYERS
	
	var highway, mainStreet, localStreet;
	
	var highwayStyle = {"clickable": false, "color": "#909090", "weight": 5, opacity: 1.0};
	$.getJSON("Layers/highway.geojson", function(data) {
		highway = L.geoJson(data, {style: highwayStyle});
	});
	
	var mainStreetStyle = {"clickable": false, "color": "#909090", "weight": 3, opacity: 1.0};
	$.getJSON("Layers/mainStreet.geojson", function(data) {
		mainStreet = L.geoJson(data, {style: mainStreetStyle});
	});
	
	var localStreetStyle = {"clickable": false, "color": "#909090", "weight": 1, opacity: 1.0};
	$.getJSON("Layers/localStreet.geojson", function(data) {
		localStreet = L.geoJson(data, {style: localStreetStyle});
	});

	// URBAN CENTER LAYERS
	
	var international, national, regional, intermunicipial, local, other, village;
	
	var internationalStyle = {"clickable": false, "radius": 7, "color": "#383838", "fillOpacity": 1.0, "opacity": 1.0};
	$.getJSON("Layers/international.geojson", function(data) {
		international = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng, internationalStyle).bindLabel(feature.properties.name, {noHide:true, className: "international"});}
		})
		map.addLayer(international);
		international.bringToFront();
	});
	
	var nationalStyle = {"clickable": false, "radius": 6, "color": "#383838", "fillOpacity": 1.0, "opacity": 1.0};
	$.getJSON("Layers/national.geojson", function(data) {
		national = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng, nationalStyle).bindLabel(feature.properties.name, {noHide:true, className: "national"});}
		})
	});
	
	var regionalStyle = {"clickable": false, "radius": 5, "color": "#383838", "fillOpacity": 1.0, "opacity": 1.0};
	$.getJSON("Layers/regional.geojson", function(data) {
		regional = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng, regionalStyle).bindLabel(feature.properties.name, {noHide:true, className: "regional"});}
		})
	});
	
	var intermunicipialStyle = {"clickable": false, "radius": 4, "color": "#383838", "fillOpacity": 1.0, "opacity": 1.0};
	$.getJSON("Layers/intermunicipial.geojson", function(data) {
		intermunicipial = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng, intermunicipialStyle).bindLabel(feature.properties.name, {noHide:true, className: "intermunicipial"});}
		})
	});
	
	var localStyle = {"clickable": false, "radius": 3, "color": "#383838", "fillOpacity": 1.0, "opacity": 1.0};
	$.getJSON("Layers/local.geojson", function(data) {
		local = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng, localStyle).bindLabel(feature.properties.name, {noHide:true, className: "local"});}
		})
	});
	
	var otherStyle = {"clickable": false, "radius": 2, "color": "#383838", "fillOpacity": 1.0, "opacity": 1.0};
	$.getJSON("Layers/other.geojson", function(data) {
		other = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng, otherStyle).bindLabel(feature.properties.name, {noHide:true, className: "other"});}
		})
	});
	
	// MAP ZOOMING
	// -----------
	
	map.on('zoomend', function(e) {
	
		// ZOOMING
		
		if (map.getZoom() >= 9) {map.addLayer(highway).addLayer(national);}
		else {map.removeLayer(highway).removeLayer(national);}
		
		if (map.getZoom() >= 10) {map.addLayer(regional);}
		else {map.removeLayer(regional);}
		
		if (map.getZoom() >= 11) {map.addLayer(mainStreet).addLayer(intermunicipial);}
		else {map.removeLayer(mainStreet).removeLayer(intermunicipial);}
		
		if (map.getZoom() >= 12) {map.addLayer(local);}
		else {map.removeLayer(local);}
		
		if (map.getZoom() >= 13) {map.addLayer(localStreet).addLayer(other);}
		else {map.removeLayer(localStreet).removeLayer(other);}

		// LAYER OVERLAY
		
		border.bringToFront();
		international.bringToFront();
		if (map.getZoom() >= 9) {national.bringToFront();}
		if (map.getZoom() >= 10) {regional.bringToFront();}
		if (map.getZoom() >= 11) {intermunicipial.bringToFront();}
		if (map.getZoom() >= 12) {local.bringToFront();}
		if (map.getZoom() >= 13) {other.bringToFront();}
	});
	
});
