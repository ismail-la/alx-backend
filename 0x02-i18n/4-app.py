#!/usr/bin/env python3
"""Basic Flask application with Force locale with URL parameter.
"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """Flask Babel config class."""

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """Get the locale for a web page.
    Return str: best match
    """
    Table_queries = request.query_string.decode('utf-8').split('&')
    table_query = dict(map(
        lambda x: (x if '=' in x else '{}='.format(x)).split('='),
        Table_queries,
    ))
    if 'locale' in table_query:
        if table_query['locale'] in app.config["LANGUAGES"]:
            return table_query['locale']
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route('/')
def get_index() -> str:
    """Return home/index page
    """
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
