import { decorate, observable, action, computed } from 'mobx';
import systemHost from '../assets/images/system-host.png';
import schoolHost from '../assets/images/school-host.png';
import hotelHost from '../assets/images/hotel.png';
import school from '../assets/images/school.png';
import config from '../config'

const icons = {
	S: school,
	HFN: schoolHost,
	HHN: hotelHost,
	HF: systemHost
};

const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
const apiKey = config.apiKey;

class Mapa {
	filters = ['HFN', 'HF', 'HHN'];
	markers = [];
	currentMarker = null;

	get filteredMarkers() {
		return this.markers.filter(m => m.type === 'S' || this.filters.includes(`${m.type}${m.subType || ''}${m.isFromSchoolNetwork? 'N': ''}`));
	}

	loadMarkers = adresses => {
		this.markers.length = 0;

		Promise.all(adresses.map(a => {
			return (
				fetch(`${geocodeUrl}?key=${apiKey}&address=${a.street}&sensor=true`)
					.then(r => r.json())
					.then(r => ({ ...a, ...r.results[0].geometry.location }))
			);
		})).then(responses => {
			responses.forEach(r => {
				this.markers.push({
					...r,
					icon: {
						url: icons[`${r.type}${r.subType || ''}${r.isFromSchoolNetwork? 'N': ''}`],
						scaledSize: { height: 50, width: 32 }
					}
				})
			})
		});
	};
}

decorate(Mapa, {
	currentMarker: observable,
	filters: observable,
	markers: observable,
	filteredMarkers: computed,
	loadMarkers: action
});

export default Mapa;