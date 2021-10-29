/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import "reflect-metadata";
import {exportJWK, exportPKCS8, exportSPKI, generateKeyPair} from "jose";
import container from "../src/inversifyConfig";
import {IJwtService} from "../src/services/interfaces/IJwtService";
import TYPES from "../src/types";

const fs = require('fs');

describe('jwtServiceTest', () => {

    const jwtService = container.get<IJwtService>(TYPES.IJwtService);

    it("createKeysTest", async () => {
        const {publicKey, privateKey} = await generateKeyPair('PS256', {modulusLength: 4096});
        const jwkPublic = await exportJWK(publicKey);
        const jwkPrivate = await exportJWK(privateKey);

        const pemPublic = await exportSPKI(publicKey);
        const pemPrivate = await exportPKCS8(privateKey);

        fs.writeFileSync(__dirname + './../storage/keys/public_key.json', JSON.stringify(jwkPublic));
        fs.writeFileSync(__dirname + './../storage/keys/private_key.json', JSON.stringify(jwkPrivate));

        fs.writeFileSync(__dirname + './../storage/keys/public_key.pem', pemPublic);
        fs.writeFileSync(__dirname + './../storage/keys/private_key.pem', pemPrivate);
    });

    it("generateAuthTokenTest", async () => {
        const token = await jwtService.generateAuthToken({firstname: 'Miguel', lastname: 'Pazo'});

        console.log(token);
    });

    it("verifyAuthTokenTest", async () => {
        const token = 'eyJhbGciOiJSUzI1NiJ9.eyJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6IlBhem8iLCJpYXQiOjE2MzU0ODUxMDIsImlzcyI6ImFwcCIsImF1ZCI6ImF1ZGllbmNlIiwiZXhwIjoxNjM1NTcxNTAyfQ.msEh6sIyYc1YFfCKOhvYhIyASxvKkiDwCYdRB40eQRxCaFcBcZXWvryRAtKhULA9F7oMGucbh_xPLiz7H7FflAw7B4khhDp9bBKgTNGXGwKChb6ZB4cSKkAG3qRM6j5vJzms--8s7gE7OZD1znNEyct5obK0ou_BWQuTsgJ5elI09KyCJbpwk5qbq4r1F-pxgc-lFVzo9phkB3U2XkfhFKH-pPxcT7mH6ynFAmYVBScMFNgLUQRaZIzH6ZlZaGK5MLt1bRKj0YetQRDRovsAjCYMg8k-eD1g3KsK9yKb1D7kGFtE5q6wo_pYTBxIwaCj_B1-kcnWEOQvbbuNWb-Vk8vDiqOBOIeX9w4PxVKBXPeE7mpRfNS9QUBLbFHX_vpS9RthV6SV1nfpjqPoQQqsy36zSLpXuTNbRaga9nuzHw3PXMCUaWy-tX1zFf6FIv1fR7uFfWp07B3Sctxo-_LPQb6_ZwNirTycZgbesz5qPzQVEQoet0So4iZ3PiKMeOH5YYzKDUYglCHwI32YN9in_m9F4lagbQ4EF7rHUNwn3Nl_RWeOoc7rktVAt8vd-GFpAc04y7ChE4GGTKgb4N9XOUwPluxbQM8q6oSvuBpa4CsBqPDBAr7qTRriKGLo7qnNbTgbv5U6sX3jAMCOC9rMBGo62hBJiUbtnuIGTHcPrOQ';
        const result = await jwtService.verifyAuthToken(token);

        console.log(result);
    });
});
