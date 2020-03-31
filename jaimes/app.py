#!/usr/bin/env python

import flask


# Create the application.
APP = flask.Flask(__name__)


@APP.route('/')
def index():
    """ Displays the index page accessible at '/'
    """
    return flask.render_template('index.html')

@APP.route('/districts/')
def districts():
    """ Displays the index page accessible at '/'
    """
    return flask.render_template('districts.html')


if __name__ == '__main__':
    APP.debug=True
    APP.run()
