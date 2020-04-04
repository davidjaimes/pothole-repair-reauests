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

@APP.route('/bokeh/')
def bokeh():
    """ Displays the index page accessible at '/'
    """
    return flask.render_template('bokeh.html')


if __name__ == '__main__':
    APP.debug=True
    APP.run()
