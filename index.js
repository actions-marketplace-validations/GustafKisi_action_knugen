const github = require("@actions/github")

const core = require("@actions/core")

const { Octokit } = require("@octokit/action");

let gifURLs = [
    'https://media.tenor.com/LQu99AFt1VYAAAAd/carl-xvi.gif', // knugen caught smoking
    'https://media.tenor.com/TgoLEOXPPlcAAAAC/carl-xvi.gif', // silly knugen
    'https://media.tenor.com/EDKmiAqaNAkAAAAd/kungen-swedish-king.gif', // nee jag tror inte det faktiskt
    'https://media.tenor.com/LQu99AFt1VYAAAAd/carl-xvi.gif',
    'https://media.tenor.com/LQu99AFt1VYAAAAd/carl-xvi.gif'
]

async function runMain(){
    try {
        const randInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let message = `<img src="${gifURLs[randInt(0, gifURLs.length - 1)]}" width="200px" /> \n`
        const octokit = new Octokit({auth: core.getInput('token')})
        let res = await octokit.rest.issues.createComment({
            issue_number: github.context.payload.issue.number,
            owner: github.context.payload.repository.owner.login,
            repo: github.context.payload.repository.name,
            body: message + core.getInput('message')
        })
        console.log(res)

    } catch( err ) {
        console.log("There was an error executing the action: " + err)
        core.setFailed(err.message)
    }
}

runMain()
