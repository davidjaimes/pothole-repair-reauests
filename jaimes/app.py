#!/usr/bin/env python

# import necessary libraries
from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup as bs
import pandas as pd

# create instance of Flask app
app = Flask(__name__)

@app.route('/')
def index():
    """ Displays the index page accessible at '/'
    """
    # Scrape the Weather from the San Diego Gov Website.
    city_url = "https://www.sandiego.gov/"
    city_response = requests.get(city_url)
    city_soup = bs(city_response.text,"html.parser")
    weather = city_soup.find("div",class_="card--weather").p.span.text

    # Scrape Additional Info table from Data Portal.
    url="https://data.sandiego.gov/datasets/gid-pothole/"
    response = requests.get(url)
    soup = bs(response.text,"html.parser")
    table = soup.find_all("table")[1]
    df = pd.read_html(str(table))[0]
    keys = df[0].values.tolist()
    values = df[1].values.tolist()
    return render_template('index.html', sdweather=weather, keyvalues=zip(keys, values))

@app.route('/council-districts/')
def councildistricts():
    """ Displays the index page accessible at '/'
    """
    return render_template('council-districts.html')

@app.route('/bokeh/')
def bokeh():
    """ Displays the index page accessible at '/'
    """
    return render_template('bokeh.html')


if __name__ == '__main__':
    app.debug=True
    app.run()
