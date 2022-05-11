let memberFunction = require("../service/member/index");
const assert = require("assert");

describe("", () => {
    it("should return status false", async() => {
        let result = await memberFunction.mochaTest({
            body: {
                number: 6
            }
        })
        assert.equal(result.status, false);
    })

    it("should return status true", async() => {
        let result = await memberFunction.mochaTest({
            body: {
                number: 4
            }
        })
        assert.equal(result.status, true);
    })
})
