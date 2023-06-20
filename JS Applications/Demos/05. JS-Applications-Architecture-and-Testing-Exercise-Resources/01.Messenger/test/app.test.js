const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

function fakeResponse(data) {
    return {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
}

let testMessage = {
    1: {
        author: "Bogdan",
        content: "Bogdan is the Gothfather"
    },

    2: {
        author: "Stili",
        content: "Stili is the Bogdan"
    }
}

describe('tests', async () => {
    before(async () => {
        browser = await chromium.launch();
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    describe('Tests', async () => {

        it('should call server', async () => {
            await page.route('**/jsonstore/messenger', route => 
                route.fulfill(fakeResponse(testMessage)));
    
            await page.goto('http://127.0.0.1:5500/01.Messenger/');
    
            const [response] = await Promise.all([
                page.waitForResponse('**/api/data'),
                page.click('#refresh'),
            ]);
    
            let result = await response.json();
            expect(result).to.eql(testMessage);
        });
    });
    
});

