#!/usr/bin/env python

# import necessary libraries
from flask import Flask, render_template, jsonify
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

@app.route('/bokeh/')
def bokeh():
    """ Displays the index page accessible at '/'
    """
    return render_template('bokeh.html')

@app.route('/json-data/')
def json_data():
    """ Displays the index page accessible at '/'
    """
    import pandas as pd
    import numpy
    import sqlite3
    from sqlalchemy import create_engine,func
    from sqlalchemy.orm import Session
    from sqlalchemy import Column, Integer, String, Float
    from sqlalchemy.ext.declarative import declarative_base

    url = 'http://seshat.datasd.org/get_it_done_311/get_it_done_pothole_requests_datasd_v1.csv'
    df = pd.read_csv(url)
    df = df[['lat', 'lng', 'status']]
    connection = sqlite3.connect('potholes.sqlite')
    df.to_sql('potholes', con=connection, if_exists='replace')

    Base = declarative_base()
    class Potholes(Base):
        __tablename__ = 'potholes'
        service_request_id = Column(Integer, primary_key=True)
        lat =  Column(Float)
        lng =  Column(Float)
        status =  Column(String)
        case_origin = Column(String)
        council_district = Column(Integer, primary_key = True)
        comm_plan_name = Column(String)

    engine = create_engine('sqlite:///potholes.sqlite')
    Base.metadata.create_all(engine)
    session = Session(bind=engine)

    mlist = []
    status = ['New', 'Referred', 'In Process']
    for stat in status:
        latitude = session.query(Potholes.lat).filter(Potholes.status == stat).all()
        latitude = numpy.array(latitude).flatten()
        longitude = session.query(Potholes.lng).filter(Potholes.status == stat).all()
        longitude = numpy.array(longitude).flatten()
        for lat, lng in zip(latitude, longitude):
            mlist.append({
                "Status": stat,
                "Latitude": lat,
                "Longitude": lng
            })
    import json
    with open('data.json', 'w') as f:
        json.dump(mlist, f)
    return jsonify(mlist)


if __name__ == '__main__':
    app.debug=True
    app.run()
