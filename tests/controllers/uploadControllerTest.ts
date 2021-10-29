/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as request from "supertest";
import {expect} from "chai";


describe("uploadControllerTest", () => {
    const server = request('http://localhost:3030');
    const token = 'zmzRXnnCMgf6QyhHqgs33je3RuYTWBs4JJn9jkQsRVUumARx89pqgAG6w3eADhCX3FRb7W';

    it("POST /upload", (done) => {
        server.post('/upload')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((error, result) => {
                if (error) {
                    console.log(error.message);
                    return done(error);
                }

                console.log(result.body);
                // expect(result.body).to.deep.eq({status: 'ok'});

                return done();
            });
    });
});
