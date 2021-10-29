/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as request from "supertest";
import {expect} from "chai";


describe("authControllerTest", () => {
    const server = request('http://localhost:3030');

    it("POST /auth", (done) => {
        const data = {
            user: 'admin',
            password: '123',
        }

        server.post('/auth')
            .set('Accept', 'application/json')
            .send(data)
            .end((error, result) => {
                if (error) {
                    console.log(error.message);
                    return done(error);
                }

                console.log(result.body);
                expect(result.body).to.deep.eq({status: 'auth'});

                return done();
            });
    });
});
