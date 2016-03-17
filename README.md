#Reveal.js Bootstrap

This repo contains a boilerplate Reveal.js presentation wired up with a presenter and attendee view, synchronized slide viewing, and basic authentication for the presenter.

## Getting Started

Install dependencies

    npm install

Then run

    node app

And visit localhost:3000/presenter. The default credentials are:

- Username: presenter
- Password: notasecret

To edit these settings, modify the presenterUsername and presenterPassword variables in the app.js file.

## Adding slides

To add slides, create files named slideN.html in the /views/partials/slides directory, where N is an integer that corresponds to the order the slides will appear in.

    <h3>This is an example slide</h3>
    <p>The html is piped into a <section> element.</p>

Note: padding zeros (e.g. 001) are NOT required and will not work.

## Extending Reveal

Reveal configurations live in assets/js/reveal-config-presenter.js and assets/js/reveal-config-attendee.js.

### License
This project is released under the ISC license. Details and a copy of the license can be found in the license.txt file included with this repository.

# Contact
Questions/comments can be directed to @notdanwilkerson or notdanwilkerson@gmail.com.
