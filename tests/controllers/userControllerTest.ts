/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as request from "supertest";
import {expect} from "chai";


describe("userControllerTest", () => {
    const server = request('http://localhost:3030');
    const jwt = 'eyJhbGciOiJSUzI1NiJ9.eyJmaXJzdG5hbWUiOiJNaWd1ZWwiLCJsYXN0bmFtZSI6IlBhem8iLCJpYXQiOjE2MzU0ODUxMDIsImlzcyI6ImFwcCIsImF1ZCI6ImF1ZGllbmNlIiwiZXhwIjoxNjM1NTcxNTAyfQ.msEh6sIyYc1YFfCKOhvYhIyASxvKkiDwCYdRB40eQRxCaFcBcZXWvryRAtKhULA9F7oMGucbh_xPLiz7H7FflAw7B4khhDp9bBKgTNGXGwKChb6ZB4cSKkAG3qRM6j5vJzms--8s7gE7OZD1znNEyct5obK0ou_BWQuTsgJ5elI09KyCJbpwk5qbq4r1F-pxgc-lFVzo9phkB3U2XkfhFKH-pPxcT7mH6ynFAmYVBScMFNgLUQRaZIzH6ZlZaGK5MLt1bRKj0YetQRDRovsAjCYMg8k-eD1g3KsK9yKb1D7kGFtE5q6wo_pYTBxIwaCj_B1-kcnWEOQvbbuNWb-Vk8vDiqOBOIeX9w4PxVKBXPeE7mpRfNS9QUBLbFHX_vpS9RthV6SV1nfpjqPoQQqsy36zSLpXuTNbRaga9nuzHw3PXMCUaWy-tX1zFf6FIv1fR7uFfWp07B3Sctxo-_LPQb6_ZwNirTycZgbesz5qPzQVEQoet0So4iZ3PiKMeOH5YYzKDUYglCHwI32YN9in_m9F4lagbQ4EF7rHUNwn3Nl_RWeOoc7rktVAt8vd-GFpAc04y7ChE4GGTKgb4N9XOUwPluxbQM8q6oSvuBpa4CsBqPDBAr7qTRriKGLo7qnNbTgbv5U6sX3jAMCOC9rMBGo62hBJiUbtnuIGTHcPrOQ';

    it("GET /user", (done) => {
        server.get('/user')
            .set('Authorization', `Bearer ${jwt}`)
            .expect(200)
            .end((error, result) => {
                if (error) {
                    console.log(error.message);
                    return done(error);
                }

                console.log(result.body);
                // expect(result.body).to.deep.eq({status: 'auth'});

                return done();
            });
    });
});
