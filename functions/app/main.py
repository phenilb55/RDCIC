import os
import logging
from flask import Flask, render_template

logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__, 
            template_folder=os.path.join(os.path.dirname(__file__), "../../templates"),
            static_folder=os.path.join(os.path.dirname(__file__), "../../static"))

app.secret_key = os.environ.get("SESSION_SECRET", "your-secure-key")

# ✅ Debugging Route
@app.route('/test')
def test():
    return {"message": "Flask function is working!"}

@app.route('/')
def index():
    return render_template('index.html', active_page='home')

# ✅ Netlify Function Handler
def handler(event, context):
    return app(event, context)
