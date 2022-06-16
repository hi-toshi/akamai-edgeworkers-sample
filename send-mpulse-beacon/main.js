import { httpRequest } from 'http-request';
import { logger } from 'log';

export async function onClientRequest(request) {
    const response_config = await httpRequest("https://c.go-mpulse.net/api/config.json?key=<Your mPulse API Key>");
    if (response_config.ok) {
        const jsonObj = await response_config.json();
        const beaconfqdn = jsonObj['beacon_url'];
        const timestamp = jsonObj['h.t'];
        const timestamp_end = Number(timestamp) + 600000;
        const token = jsonObj['h.cr'];

        const beaconurl = `https:${beaconfqdn}?api=1&api.v=1&h.key=<Your mPulse API Key>&h.cr=${token}&h.t=${timestamp}&rt.end=${timestamp_end}&rt.start=manual&`
        request.setVariable('PMUSER_BEACONURL',beaconurl);

    } else {
        logger.log("Failed to get config");
    }
}

export async function onClientResponse(request, response) {
    const brand = request.device.brandName;
    const city = request.userLocation.city;
    const beaconurl = request.getVariable('PMUSER_BEACONURL');
    const path = request.path;

    const beaconurl_param = beaconurl + `t_done=1&cdim.brand=${brand}&cdim.city=${city}`;
    send(beaconurl_param);
}

async function send (url) {
    const response = await httpRequest(url);
    if (response.ok) {
        logger.log("mPulse beacon is sent");
    } else {
        logger.log("Failed to send a beacon");
    }
}