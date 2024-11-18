import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import L from 'leaflet'; // Import the L object from Leaflet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'; // Import the map icon
import geoJsonData from './countries.geo.json';

const normalizeName = (name) => {
  return name ? name.trim().toLowerCase().replace(/[^a-z0-9]/g, '') : '';
};

const getColor = (count) => {
  return count > 100 ? '#08306b' : // Dark Blue
         count > 50  ? '#08519c' : // Medium-Dark Blue
         count > 20  ? '#2171b5' : // Medium Blue
         count > 10  ? '#4292c6' : // Light Medium Blue
         count > 5   ? '#6baed6' : // Light Blue
         count > 0   ? '#9ecae1' : // Very Light Blue
                       '#deebf7';  // Pale Blue
};

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [0, 5, 10, 20, 50, 100];

      div.innerHTML = '<strong>Guest Count</strong><br>';

      // loop through the guest count intervals and generate a label with a colored rectangle for each interval
      for (let i = 0; i < grades.length; i++) {
        const from = grades[i];
        const to = grades[i + 1];

        div.innerHTML +=
          '<div style="display: flex; align-items: center; margin-bottom: 4px;">' +
          '<div style="width: 20px; height: 20px; background:' + getColor(from + 1) + '; margin-right: 8px;"></div>' +
          from + (to ? '&ndash;' + to : '+') + '</div>';
      }

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

const HotelGuestsMap = ({ darkMode, bookingData }) => {
  const [countryCounts, setCountryCounts] = useState({});

  useEffect(() => {
    // Aggregate counts by normalized country name
    const counts = bookingData.reduce((acc, booking) => {
      const normalizedCountry = normalizeName(booking.Origin_Country);
      const peopleCount = booking.No_of_People || 1;

      if (!acc[normalizedCountry]) {
        acc[normalizedCountry] = 0;
      }
      acc[normalizedCountry] += peopleCount;
      return acc;
    }, {});

    setCountryCounts(counts);
    console.log('Aggregated Guest Counts by Country:', counts);
  }, [bookingData]);

  useEffect(() => {
    // Match GeoJSON country names and log the guest counts
    geoJsonData.features.forEach((feature) => {
      const countryName = feature.properties.name;
      const normalizedGeoJsonCountry = normalizeName(countryName);
      const guestCount = countryCounts[normalizedGeoJsonCountry] || 0;

      console.log(`Country: ${countryName} | Normalized: ${normalizedGeoJsonCountry} | Guest Count: ${guestCount}`);
    });
  }, [countryCounts]);

  const onEachFeature = (feature, layer) => {
    const countryName = feature.properties.name;
    const normalizedGeoJsonCountry = normalizeName(countryName);
    const count = countryCounts[normalizedGeoJsonCountry] || 0;

    layer.setStyle({
      fillColor: getColor(count),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    });

    layer.bindTooltip(
      `<strong>${countryName || "Unknown"}</strong><br>Guests: ${count}`,
      { sticky: true }
    );
  };

  const tileLayerURL = darkMode
    ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";

  return (
    <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`} style={{ height: '100%', width: '100%' }}>
      <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" /> {/* Add the map icon here */}
        Hotel Guests by Country
      </h2>
      
      <MapContainer
        key={JSON.stringify(countryCounts)} // Ensure the map re-renders if the data changes
        center={[20, 0]}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url={tileLayerURL}
          attribution={null}
        />
        <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
        <Legend /> {/* Add the legend component here */}
      </MapContainer>
    </div>
  );
};

export default HotelGuestsMap;
