from flask import Flask,render_template
app=Flask(__name__)
table={
    "table1":'<table border="1" class="dataframe">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>0</th>\n      <th>1</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>License</td>\n      <td>Open Data Commons Public Domain Dedication and Licence (PDDL)</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>Publisher</td>\n      <td>Performance &amp; Analytics</td>\n    </tr>\n    <tr>\n      <th>2</th>\n      <td>Date Issued (YYYY-MM-DD)</td>\n      <td>2017-06-13</td>\n    </tr>\n    <tr>\n      <th>3</th>\n      <td>Date Modified (YYYY-MM-DD)</td>\n      <td>2020-04-05</td>\n    </tr>\n    <tr>\n      <th>4</th>\n      <td>Category</td>\n      <td>City Management</td>\n    </tr>\n    <tr>\n      <th>5</th>\n      <td>Maintainer</td>\n      <td>City of San Diego</td>\n    </tr>\n    <tr>\n      <th>6</th>\n      <td>Maintainer Email</td>\n      <td>data@sandiego.gov</td>\n    </tr>\n  </tbody>\n</table>',
    "table2":'<div class="card--weather">\n<i class="icon-cloud"></i>\n<p class="temperature"><span class="degrees">63</span>°</p>\n<p><strong>San Diego <br/> Weather</strong></p>\n</div>'
}

@app.route("/")
def home():
    return render_template("test.html",table=table)

if __name__=="__main__":
    app.run(debug=True)