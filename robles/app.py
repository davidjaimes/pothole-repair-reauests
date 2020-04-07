import pandas as pd
import sqlite3
from sqlalchemy import create_engine,func
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from flask import Flask, jsonify


engine = create_engine('sqlite:///potholes.sqlite')

app = Flask(__name__)

#Flask Route 

@app.route("/")
def Potholes():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/leaflet"
       
     )


@app.route("/api/v1.0/leaflet")
def leaflet():
    leaflet = pd.read_sql("select service_request_id, status, lat, lng, case_origin from potholes", con = engine)
    result = leaflet.to_dict(orient="records")
    return jsonify(result)
    


