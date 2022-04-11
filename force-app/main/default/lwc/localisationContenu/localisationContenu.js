import { LightningElement } from 'lwc';

export default class LightningMapExample extends LightningElement {
    mapMarkers = [
        {
            location: {
                Latitude: '36.920758740032646',
                Longitude: '10.2944180306871',

              
            },
            title: 'Metropolitan Museum of Art',
            description:
                'A grand setting for one of the greatest collections of art, from ancient to contemporary.',
        },
    ];
    zoomLevel = 15;
    listView = 'visible';
    mapOptions = {
        draggable: true,
        zoomControl: true,
        scrollwheel	:true,
    };
}