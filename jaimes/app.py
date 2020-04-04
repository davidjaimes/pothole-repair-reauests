#!/usr/bin/env python

# import necessary libraries
from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup as bs

# create instance of Flask app
app = Flask(__name__)

@app.route('/')
def index():
    """ Displays the index page accessible at '/'
    """
    city_url="https://www.sandiego.gov/"
    city_response=requests.get(city_url)
    city_soup=bs(city_response.text,"html.parser")
    weather = city_soup.find("div",class_="card--weather").p.span.text
    return render_template('index.html', sdweather=weather)

@app.route('/districts/')
def districts():
    """ Displays the index page accessible at '/'
    """
    return render_template('districts.html')

@app.route('/bokeh/')
def bokeh():
    """ Displays the index page accessible at '/'
    """
    return render_template('bokeh.html')


if __name__ == '__main__':
    app.debug=True
    app.run()
