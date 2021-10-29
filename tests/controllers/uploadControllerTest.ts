/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as request from "supertest";
import {expect} from "chai";


describe("uploadControllerTest", () => {
    const server = request('http://localhost:3030');
    const token = 'eyJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJzaWdhaF9pc3MiLCJzdWIiOiJzaWdhaF9zdWIiLCJhdWQiOiJzaWdhaF9hdWQiLCJraWQiOiJ4eHgiLCJqdGkiOiJ4eHgiLCJ1c2VyIjoiYWxleC5hbHgxMDdAZ21haWwuY29tIiwibmFtZSI6IkFsZXhhbmRlciIsInJvbCI6Im9wZXJhdG9yIiwidGVuYW50Ijp7ImNvZGUiOiIwMDAxIiwibmFtZSI6IkNPTlRSQVRPIENMSU5JQ0EgSU5URVJOQUNJT05BTCBTIEEifSwicGxhbnQiOnsiY29kZSI6IjAwMDEiLCJuYW1lIjoiUExBTlRBIENBTExBTyJ9LCJpYXQiOjE2MjMzNjQzNDQsImV4cCI6MTYyMzQ1MDc0NH0.BPKyNkYe2iYfyTbGevg-Gmf7HrQ_KMiDDCEHaQWrGMyNbwMYltUlN058-XI03iXSdJvcRSt7Q_qf8gBC9qXEYs-Abfa7MnzDCfHLn6e666PgRjAujVlNKxAN8RS8o_x8BWEPKBd3rIQXRmOKTxB9QM_7NB2eKVE8c6m4C_9xSN5QJ5NRRAo2ysMnNzOGAh3sUCK4T3IQNRdFgVOiWfd67BZOFNgyJEjkw5iBpMC2QHcY6_W6p_fYMspLhVLN9xSGZmsOrCVBjNss5kUvlw9gt4OqArE5BexLgzp3KapAnkiz8mLbeDYG8IGkBan1c8BUyEQSiS-_D4qgZi316NV9IAc';

    it("GET /", (done) => {
        server.get('/')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((error, result) => {
                if (error) {
                    console.log(error.message);
                    return done(error);
                }

                console.log(result.body);
                expect(result.body).to.deep.eq({status: 'ok'});

                return done();
            });
    });
});
