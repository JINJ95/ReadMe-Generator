// fs is a Node standard library package for reading and writing files
const fs = require("fs");
const axios = require("axios");
const inquirer = require('inquirer');
const MarkdownIt = require('markdown-it');
const util = require('util');
// Markdown
md = new MarkdownIt();

//inquirer
inquirer
    .prompt([
        {
            name: 'username',
            message: 'What is your GitHub Username?',
            default: '',
        },
        {
            name: 'email',
            message: 'What is your GitHub Email?',
            default: '',
        },
        {
            name: 'photo',
            message: 'Would you like to display your GitHub profile picture?',
            default: 'yes or no',
        },
        {
            name: 'Title',
            message: 'Enter your Project Title?',
            default: 'Title',
        },
        {
            name: 'Description',
            message: 'Describe your project:',
            default: 'Description',
        },
        {
            name: 'Installation',
            message: 'How do you install your project?',
            default: 'npm i',
        },
        {
            name: 'Tests',
            message: 'How to Test?',
            default: 'Test',
        },
        {
            name: 'License',
            message: 'What license does your project hold?',
            default: 'MIT',
        },
    ])
    .then(answers => {
        //console.info('Answers:', answers);
        //github
        const queryUrl = `https://api.github.com/users/${answers.username}`;
        axios.get(queryUrl).then(function (res) {
            //if license is equal to mit or MIT
            if (answers.License === "mit" || answers.License === "MIT") {
                var mitLicense = md.render('[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)');
            }
            // made with markdown badge
            var markDownBadge = md.render('[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org)');
            fs.appendFileSync('./Assets/README.md', markDownBadge + mitLicense + '\n'), function (err) {
                if (err) throw err;
            }

            //if yes to profile picture
            if (answers.photo === 'yes') {
                var sizedPhoto = res.data.avatar_url + '&s=200';
                var photo = md.render(`![Profile Picture](${sizedPhoto})`);
                fs.appendFileSync('./Assets/README.md', photo + '\n', function (err) {
                    if (err) throw err;
                })

                //Title
                //creates a variable for title that is <h1> in MD
                var projectTitle = md.render('# ' + answers.Title);
                fs.appendFileSync('./Assets/README.md', projectTitle + '\n', function (err) {
                    if (err) throw err;
                    //console.log('title saved');
                })
                //Description
                var descriptionTitle = md.render('# Description');
                fs.appendFileSync('./Assets/README.md', descriptionTitle + '\n', function (err) {
                    if (err) throw err;
                })
                fs.appendFileSync('./Assets/README.md', answers.Description + '\n', function (err) {
                    if (err) throw err;
                })
                //Table of Contents
                var tableOfContentsTitle = md.render('# Table of Contents');
                fs.appendFileSync('./Assets/README.md', tableOfContentsTitle + '\n', function (err) {
                    if (err) throw err;
                })
                const tableOfContents = md.render('* [Installation](#installation) \n * [Usage](#usage) \n * [Tests](#tests) \n * [Contributing](#contributing) \n * [FAQ](#FAQ) \n * [Support](#support) \n * [License](#license)');
                fs.appendFileSync('./Assets/README.md', tableOfContents + '\n', function (err) {
                    if (err) throw err;
                })

                //Installation
                var installationTitle = md.render('# Installation');
                fs.appendFileSync('./Assets/README.md', installationTitle + '\n', function (err) {
                    if (err) throw err;
                })
                fs.appendFileSync('./Assets/README.md', answers.Installation + '\n', function (err) {
                    if (err) throw err;
                })
                //Usage
                var usageTitle = md.render('# Usage');
                fs.appendFileSync('./Assets/README.md', usageTitle + '\n', function (err) {
                    if (err) throw err;
                })
                fs.appendFileSync('./Assets/README.md', '* Provide instructions and examples for use. Include screenshots as needed.' + '\n', function (err) {
                    if (err) throw err;
                })
                //Tests
                var testsTitle = md.render('# Tests');
                fs.appendFileSync('./Assets/README.md', testsTitle + '\n', function (err) {
                    if (err) throw err;
                })
                fs.appendFileSync('./Assets/README.md', answers.Tests + '\n', function (err) {
                    if (err) throw err;
                })
                //Contributing
                var contributingTitle = md.render('# Contributing');
                fs.appendFileSync('./Assets/README.md', contributingTitle + '\n', function (err) {
                    if (err) throw err;
                })
                var contributingInfo = md.render('__Instructions__ \n * Fork or Clone repo to your local machine \n \n * HACK AWAY! \n \n * Create a new pull request');
                fs.appendFileSync('./Assets/README.md', contributingInfo + '\n', function (err) {
                    if (err) throw err;
                })
                //FAQ
                var questionsTitle = md.render('# FAQ');
                fs.appendFileSync('./Assets/README.md', questionsTitle + '\n', function (err) {
                    if (err) throw err;
                })
                var faqDemo = md.render('* __How do I do _specifically_ do and so?__ \n  * No problem! Just do this...')
                fs.appendFileSync('./Assets/README.md', faqDemo + '\n', function (err) {
                    if (err) throw err;
                })
                //Support
                var supportTitle = md.render('# Support');
                fs.appendFileSync('./Assets/README.md', supportTitle + '\n', function (err) {
                    if (err) throw err;
                })
                var supportEmail = md.render(`* GitHub Email: ${answers.email}`);
                fs.appendFileSync('./Assets/README.md', 'Reach out to me! \n' + supportEmail + '\n', function (err) {
                    if (err) throw err;
                })
                //License
                var licenseTitle = md.render('# License');
                fs.appendFileSync('./Assets/README.md', licenseTitle + '\n', function (err) {
                    if (err) throw err;
                })
                fs.appendFileSync('./Assets/README.md', answers.License + '\n', function (err) {
                    if (err) throw err;
                })
            }
            return //console.log(res);
        });


    });


