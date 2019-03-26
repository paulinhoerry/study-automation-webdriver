const {Builder, By, Key, until} = require('selenium-webdriver');
const async = require('async');

const driver = new Builder().forBrowser('chrome').build();

async.auto({
    openSite: (done) => {
        driver.get('http://www.organizze.com.br/');
        let loginBtn = driver.findElement(By.className('login'));

        console.log('saiu daqui');
        loginBtn.click().then( () => done(null, true) )
    },
    formLogin: ['openSite', (results, done) => {
        let formLogin = driver.wait(until.elementLocated(By.id('login-form')));
        let inputEmail = formLogin.findElement(By.id('user_email'));
        let inputPassword = formLogin.findElement(By.id('user_password'));

        let btnSubmit = formLogin.findElement(By.css('button'));

        inputEmail.sendKeys('paulinhoerry+organizze@gmail.com');
        inputPassword.sendKeys('wishmaster');

        btnSubmit.sendKeys(Key.ENTER).then( () => done(null, true) );

    }],
    getBalance: ['formLogin', (results, done) => {
        let balanceBox = driver.wait(until.elementLocated(By.className('main-info info-text'))).getText();


        // tou tentando agora pegar o valor do saldo da conta

        balanceBox.then( (res) => {
            console.log(res);
        })

    }],
    results: ['formLogin', (results, done) => {
        //console.log(results.formLogin);
    }]
}, (err, resp) => {
    if (err) {
        console.log('error')
        return;
    }

    console.log(resp);
})